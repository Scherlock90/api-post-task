/*
Typicode is a service that runs a simulated rest api. It supprts GET, 
POST, PUT, PATCH, DELETE and OPTIONS. No data will be updated in POST, 
PUT, PATCH, DELETE calls but an appropriate response will be returned
as if the data was processed. This means that no changes will be stored
when the pen is reloaded or rerun. The advantage is that Typicode 
provides a real(ish) external resource for ajax methods.

Resources
¯¯¯¯¯¯¯¯¯
Typicode
https://github.com/typicode/jsonplaceholder
https://github.com/typicode/json-server

Axios (Promise based HTTP client to run ajax/xhr requests)
https://github.com/axios/axios

React
https://reactjs.org/
https://reactjs.org/docs/portals.html
https://react-redux.js.org/
https://github.com/reduxjs/react-redux
https://github.com/reduxjs/redux-thunk
https://redux.js.org/advanced/middleware
*/

console.clear();

// Reducer actions
const LOAD_USERS			= 1;
const LOAD_POSTS			= 2;
const UPDATE_POST			= 3;
const REMOVE_POST			= 4;
const ADD_POST				= 5;
const PREPARE_COMMENTS	= 6;
const LOAD_COMMENTS		= 7;
const ADD_COMMENT			= 8;

// API endpoints
const POSTS_API 		= 'https://jsonplaceholder.typicode.com/posts/';
const USERS_API 		= 'https://jsonplaceholder.typicode.com/users/';
const COMMENTS_API	= 'https://jsonplaceholder.typicode.com/comments/';

/*
 * Reducers
 */

/*
 * Users
 */
const users = (state = [], action) => {
	
	// Sets/replace all of the users using the payload
	switch (action.type) {
		case LOAD_USERS:
			return action.payload;
	}
	
	return state;
}

/*
 * Posts
 */
const posts = (state, action) => {
	
	// Default settings
	if (typeof state == 'undefined') {
		state = {
			list: []
		};
	}
	
	// Create a copy of the current posts
	let posts 	= [...state.list];
	let post 	= false; 
	
	switch (action.type) {
		// Add a new post
		case ADD_POST:
			// Add the comments placholder
			if (typeof action.payload.comments == 'undefined') {
				action.payload.comments = false;
			}
			
			posts.push(action.payload);
			posts.sort(comparePosts);
			return {...state, list: posts};
			
		// Set/replace the posts with the payload
		case LOAD_POSTS:
			action.payload.map(post => {
				// Add the comments placholder
				if (typeof post.comments == 'undefined') {
					post.comments = false;
				}
			});
			return {...state, list: action.payload};
			
		// Update an existing post
		case UPDATE_POST:
			// Get the targeted post
			post = posts.find((obj) => {
				return obj.id == action.payload.id;
			});
			
			// Update the post
			if (post) {
				post.title 	= action.payload.title;
				post.body	= action.payload.body
				post.userId	= action.payload.userId
			}
			
			// Sort the posts by title
			posts.sort(comparePosts);
			
			return {...state, list: posts};
			
		//  Remove an existing post
		case REMOVE_POST:
			return {...state, list: posts.filter(post => post.id != action.payload)};
			
		case PREPARE_COMMENTS:
			// Get the targeted post
			post = posts.find((obj) => {
				return obj.id == action.payload.id;
			});
			
			// Update the post
			if (post) {
				post.comments = 'loading';
			}
			
			return {...state, list: posts};
			
		case LOAD_COMMENTS:
			// Get the targeted post
			post = posts.find((obj) => {
				return obj.id == action.payload.id;
			});
			
			// Update the post
			if (post) {
				post.comments = action.payload.comments
			}
			
			return {...state, list: posts};
			
		case ADD_COMMENT:
			// Get the targeted post
			post = posts.find((obj) => {
				return obj.id == action.payload.postId;
			});
			
			// Update the post
			if (post) {
				post.comments.push(action.payload);
			}
			
			return {...state, list: posts};
	}
	return state;
}

// Combine all of the reducers
const allReducers = Redux.combineReducers({
	users,
	posts
});

// Define the middleware function
const { applyMiddleware } = Redux;

// Create the Redux store
const store = Redux.createStore(allReducers, applyMiddleware(ReduxThunk.default));

/*
 * Thunks
 * 
 * Thunks are the recommended middleware for basic Redux side 
 * effects logic, including complex synchronous logic that 
 * needs access to the store, and simple async logic like 
 * AJAX requests.
 * 
 * I have combined these in an object instead of as individual 
 * functions as most tutorials do. This potientially opens up 
 * to using classes and better naming conventions 
 * (ie users.load and posts.load)
 */
const thunks = {
	// Load users from the remote data source then add them to the store
	loadUsers: () => dispatch => 
		axios.get(USERS_API + '?_sort=name')
			.then(response => {
				dispatch({
					type: LOAD_USERS,
					payload: response.data
				});
			})
			.catch((error) => console.error(error)),
		
	// Remove a post from the remote data source then remove it from the store
	removePost: (postId) => dispatch =>
		axios.delete(POSTS_API + postId)
			.then(() => {
				dispatch({
					type: REMOVE_POST,
					payload: postId
				});
			})
			.catch((error) => console.error(error)),
	
	// Load posts from the remote data source then add them to the store
	loadPosts: () => dispatch => 
		axios.get(POSTS_API + '?_sort=title')
			.then(response => response.data)
			.then(data => {
				dispatch({
					type: LOAD_POSTS,
					payload: data
				});
			})
			.catch((error) => console.error(error)),
	
	// Update a post in the remote data source then update the store
	savePost: (postId, userId, title, body) => dispatch => 
		axios.put(POSTS_API + postId, {
			userId	: userId,
			title		: title,
			body		: body
		})
		.then(response => {
			dispatch({
				type: UPDATE_POST,
				payload: {
					id			: postId,
					userId	: response.data.userId,
					title		: response.data.title,
					body		: response.data.body
				}
			});
		})
		.catch((error) => console.error(error)),

	// Add a post to the remote data source then update the store
	addPost: (userId, title, body) => dispatch => 
		axios.post(POSTS_API, {
			userId	: userId,
			title		: title,
			body		: body
		})
		.then(response => {
			let posts 	= store.getState().posts.list;
			let id 		= response.data.id;

			// Make sure the id is unique
			// typicode returns the id but as it is a faked api, it seems to be always 101
			while (posts.find(post => post.id == id)) {
				id = Math.ceil(Math.random() * 200) + 100;
			}

			dispatch({
				type: ADD_POST,
				payload: {
					id			: id,
					userId	: response.data.userId,
					title		: response.data.title,
					body		: response.data.body
				}
			});
		})
		.catch((error) => console.error(error)),
	
	// Load the comments fro a post from the remote data source then add then to the store
	loadComments: (postId) => dispatch => 
		axios.get(COMMENTS_API + '?postId=' + postId)
		.then(response => {
			dispatch({
				type: LOAD_COMMENTS,
				payload: {
					comments	: response.data,
					id			: postId
				}
			});
		})
		.catch((error) => console.error(error)),
	
	// Save a comment to the remote data source then update the store
	saveComment: (postId, name, email, body) => dispatch =>
		axios.post(COMMENTS_API, {
			postId: postId,
			name	: name,
			email	: email,
			body	: body
		}).then(response => {
			let post	= store.getState().posts.list.find(post => post.id == postId);
			let id 	= response.data.id;

			// Make sure the id is unique
			// typicode returns the id but as it is a faked api, it seems to be always 101
			while (post.comments.find(comment => comment.id == id)) {
				id = Math.ceil(Math.random() * 200) + 100;
			}
			
			dispatch({
				type: ADD_COMMENT,
				payload: {
					postId: postId,
					id		: id,
					name	: response.data.name,
					email	: response.data.email,
					body	: response.data.body
				}
			});
		})
}

// Compares the post titles when sorting
const comparePosts = (a, b) => {
	let aTitle = a.title.toUpperCase();
	let bTitle = b.title.toUpperCase();

	if (aTitle > bTitle) {
		return 1;
	}

	if (aTitle < bTitle) {
		return -1
	}

	return 0;
};

/*
 * The base post class
 */
class Post extends React.Component {
	constructor(props) {
		super(props);
	}
	
	// Gets the post object based on the set post id
	getPost() {
		return this.props.posts.list.find((item) => {
			return item.id == this.props.postId;
		});		
	}
	
	// Gets the user object
	getUser(id) {
		return this.props.users.find((item) => {
			return item.id == id;
		});		
	}
}

/*
 * Handles the post add and edit forms
 */
class PostForm extends Post {
	constructor(props) {
		super(props);
		
		this.saveButton 	= React.createRef();
		this.cancelButton = React.createRef();
		
		let post = this.getPost();
		
		// Set the initial values for the form fields
		this.state = {
			...this.state,
			title		: post ? post.title : '',
			body		: post ? post.body : '',
			userId	: post ? post.userId : this.props.users[0].id 
		};
	}
	
	// Sets the post title when the title field is changed
	setTitle = (event) => {
		this.setState ({
			title: event.target.value
		});
	}
	
	// Sets the post body when the body field is changed
	setBody = (event) => {
		this.setState ({
			body: event.target.value
		});
	}
	
	// Sets the post user when the user field is changed
	setUserId = (event) => {
		this.setState ({
			userId: event.target.value
		});
	}

	// Saves the form to the remote data source and the store
	doSave = () => {
		// Disable the submit buttons to prevent doubel saves
		this.saveButton.current.setAttribute('disabled', true);
		this.cancelButton.current.setAttribute('disabled', true);		
		this.saveButton.current.innerText = 'Saving';
		
		if (this.props.postId) {
			
			// Save an exisitng post
			this.props.dispatch(thunks.savePost(
				this.props.postId, 
				this.state.userId, 
				this.state.title, 
				this.state.body
			)).then(this.props.doSave);

		} else {
			
			// Save a new post
			this.props.dispatch(thunks.addPost(
				this.state.userId, 
				this.state.title, 
				this.state.body
			)).then(this.props.doSave);
			
		}
	}
	
	// Render the form
	render() {
		return (
			<div className="editor">
				<div className="post-form">
					<select value={this.state.userId} onChange={this.setUserId}>
						{Object.values(this.props.users).map(user => <option 
							key={user.id} 
							value={user.id}
						>{user.name}</option>)}
					</select>
					<input className="title" value={this.state.title} onChange={this.setTitle} />
					<textarea value={this.state.body} onChange={this.setBody} />
					<button 
						ref={this.cancelButton} 
						className="secondary" 
						onClick={this.props.doCancel}
					>Cancel</button>
					<button ref={this.saveButton} onClick={this.doSave}>Save</button>
				</div>
			</div>
		);
	}
}

/*
 * Handles the post row display
 */
class PostRow extends Post {
	constructor(props) {
		super(props);
		
		this.removeButton			= React.createRef();
		this.editButton 			= React.createRef();
		this.el 						= false; // Dom element for the post form
		
		this.state = {
			...this.state,
			form			: false,
			showComments: false
		};
	}
	
	// Remove the edit form from the dom whe the row is dropped
	componentWillUnmount() {
		if (this.el) {
			document.body.removeChild(this.el);
		}
	}
	
	// Edit the post and render the edit form
	doEdit = () => {
		// Create the dom placeholder for the form
		if (!this.el) {
			this.el = document.createElement('div');
			document.body.append(this.el);
		}
		
		// Create the form with a React Portal
		this.setState({
			form: ReactDOM.createPortal(<ReduxForm
				postId={this.props.postId}
				doSave={this.closeForm}
				doCancel={this.closeForm}
			/>, this.el)
		});
	}
	
	// Remove the post from the remote source and the store
	doRemove = () => {
		// Disable the button to prevent further actions
		this.editButton.current.setAttribute('disabled', true);
		this.removeButton.current.setAttribute('disabled', true);
		
		// Remove the post
		this.props.dispatch(thunks.removePost(this.props.postId));
	}
	
	// Close the post form
	closeForm = () => {
		this.setState({
			form:	false
		});
	}
	
	// Shows and hides the post's comments
	toggleComments = () => {
		this.setState({
			showComments: !this.state.showComments
		}, this.initiateComments);
	}
	
	// Load the comments for the form 
	initiateComments = () => {
		// Check if the comments are loaded or not in the process of getting loaded
		if (
			this.state.showComments && 
			!this.getPost().comments && 
			this.getPost().comments !== 'loading'
		) {
			// Shows the loading state
			this.props.dispatch({
				type: PREPARE_COMMENTS,
				payload: {
					id: this.props.postId
				}
			});
			
			// Load the comments
			this.props.dispatch(thunks.loadComments(this.props.postId));
		}
	}
	
	// Render the post row
	render() {
		let post 				= this.getPost();
		let className 			= 'post ' + this.state.mode;
		let commentsButton	= !post.comments ? 'Load' : 'Open';
		
		return (
			<div className={className}>
				{this.state.form}
				<h5>
					{post.title}
					<div className="buttons">
						<button className="remove" onClick={this.doRemove} ref={this.removeButton}>X</button>
						<button className="edit" onClick={this.doEdit} ref={this.editButton}>E</button>
					</div>
					<span>{post.id}</span>
				</h5>
				<div className="post-author">{this.getUser(post.userId).name}</div>
				<div className="post-body">{post.body}</div>
				<div className="comments">
					<h6>Comments<span onClick={this.toggleComments}>{this.state.showComments ? 'Close' : commentsButton}</span></h6>
					<div className={this.state.showComments ? '' : 'hidden'}>
						{!post.comments || post.comments == 'loading' ?
							<React.Fragment>
								Loading comments...
							</React.Fragment>
							:
							<React.Fragment>
								{post.comments.map(comment => <CommentRow key={comment.id} comment={comment} />)}
								<ReduxCommentForm postId={this.props.postId} />
							</React.Fragment>
						}
					</div>
				</div>
			</div>				
		);
	}
}

// Manages the add comment form
class ComentForm extends React.Component {
	constructor(props) {
		super(props);
		
		// Cache holder for the handler methods
		this.handlers = []; 
		
		this.saveCommentButton = React.createRef();
		
		this.state = {
			commentName	: '',
			commentEmail: '',
			commentBody	: ''
		};
	}
	
	// Store the handlers for change to form fields
	setCommentState = name => {
		if (!this.handlers[name]) {
		 	this.handlers[name] = (event) => {
				let newState = {};
				newState[name] = event.target.value;
				this.setState(newState);
			};
		}
		return this.handlers[name];
	}

	// Saves a new comment to the remote data source then adds it to the store
	saveComment = (event) => {
		event.preventDefault();
		
		// Prevent the form from submitting twice
		this.saveCommentButton.current.setAttribute('disabled', true);
		this.saveCommentButton.current.innerText = 'Saving';
		
		// Save the form
		this.props.dispatch(thunks.saveComment(
			this.props.postId,
			this.state.commentName,
			this.state.commentEmail,
			this.state.commentBody
		)).then(() => {
			// Reset to the form to allow a new comment to be added
			this.setState({
				commentName	: '',
				commentEmail: '',
				commentBody	: ''
			}, () => {
				this.saveCommentButton.current.setAttribute('disabled', false);
				this.saveCommentButton.current.innerText = 'Add';
			});
		});
	}

	// Render the form
	render() {
		return (
			<div className="add-comment">
				<div className="add-comment-title">Add your comment</div>
				<form onSubmit={this.saveComment}>
					<div className="grid col-1-1">
						<input 
							placeholder="Your name" 
							required 
							value={this.state.commentName} 
							onChange={this.setCommentState('commentName')}
						/>
						<input 
							type="email" 
							placeholder="Your email" 
							required
							value={this.state.commentEmail}
							onChange={this.setCommentState('commentEmail')}
						/>
					</div>
					<textarea 
						placeholder="Your comment"
						required
						value={this.state.commentBody}
						onChange={this.setCommentState('commentBody')}
					></textarea>
					<button ref={this.saveCommentButton}>Add</button>
				</form>
			</div>
		);
	}
}

// Manages a comment row
class CommentRow extends React.Component {
	constructor(props) {
		super(props);
	}
	
	// Render the row
	render() {
		return (
			<div className="comment">
				<div className="comment-body">{this.props.comment.body}</div>
				<span className="yellow">{this.props.comment.name} ({this.props.comment.email})</span>
			</div>
		);
	}
}

// The main page component
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading		: true,
			loadData		: 'users',
			posts			: [],
			users			: {},
			error			: null,
			postPage		: 1,
			postLimit	: 10,
			addPost		: false
		};
		
		// DOM container for the modal
		this.el = false;
	}
	
	// Load the users from the remote source when the page loads then load the posts
	componentDidMount() {
		this.props.dispatch(thunks.loadUsers())
			.then((res) => {this.getPosts(res)});
	}
	
	// Load the posts from the remote source
	getPosts = (res) => {
		this.setState({
			loadData: 'posts'
		}, () => {
			this.props.dispatch(thunks.loadPosts()).then(() => {
				this.setState({
					loading: false
				});
			});
		});
	}
	
	// Sets the current page for pagination
	setPostPage = (event) => {
		this.setState({
			postPage: Number(event.target.value)
		});
	}
		
	// Update the pagination when a change has been made
	// IE reset the last pagination page buttons when a page is 
	componentDidUpdate() {
		if (this.state.postPage != 1) {
			let totalPages = Math.ceil(this.props.posts.list.length/this.state.postLimit);
			if (this.state.postPage > totalPages) {
				this.setState({
					postPage: totalPages
				});
			}
		}
	}

	// Oppen the add post form
	openNewPostForm = () => {
		if (!this.el) {
			this.el = document.createElement('div');
			document.body.append(this.el);
		}
		
		this.setState({
			addPost: ReactDOM.createPortal(<ReduxForm
					doSave={this.closeAddPostForm}
					doCancel={this.closeAddPostForm}
				/>, this.el)
		});
	}
	
	// Closes the add post form
	closeAddPostForm = () => {
		this.setState({
			addPost	: false
		});			
	}
	
	// Render the page
	render() {
		let page			= (this.state.postPage - 1) * this.state.postLimit;
		let posts 		= this.props.posts.list.slice(page, page + this.state.postLimit);
		let pagination	= [];

		for (let count = 1; count <= Math.ceil(this.props.posts.list.length/this.state.postLimit); count++) {
			pagination.push(count);
		}
	
		return (
		<React.Fragment>
			<h1>React Remote Data 
				{!this.state.loading &&
					<button onClick={this.openNewPostForm}>Create Post</button>
				}
			</h1>
			<div className="page-content">
				{!this.state.loading ?
					posts.map((post) => <ReduxPost key={post.id} postId={post.id} />)
					:
					<p>loading {this.state.loadData}...</p>
				}
			</div>
			<div className="pagination">
				{pagination.map(targetPage => <button 
					key={targetPage} 
					value={targetPage} 
					className={targetPage == this.state.postPage ? "current" : ""} 
					onClick={this.setPostPage}
				>{targetPage}</button>)}
			</div>
			{this.state.addPost}
		</React.Fragment>
		);
	}
}

// Sets the store as a prop for each React class
const ReduxApp				= ReactRedux.connect(state => state)(App);
const ReduxPost			= ReactRedux.connect(state => state)(PostRow);
const ReduxForm			= ReactRedux.connect(state => state)(PostForm);
const ReduxCommentForm	= ReactRedux.connect(state => state)(ComentForm);

ReactDOM.render(<ReactRedux.Provider store={store}><ReduxApp /></ReactRedux.Provider>, document.getElementById('App'));