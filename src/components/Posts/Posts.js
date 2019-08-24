import React, { Component } from 'react';
import ReactModal from 'react-modal';
import Spinner from 'react-spinner-material';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchPosts } from '../../actions/actions';
import PostForm from './Elements/PostForm';
import PostsCards from './Elements/PostsCards';
import NavigationPosts from './Elements/NavigationPosts';
import 'react-confirm-alert/src/react-confirm-alert.css';

class Posts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			usersArray: [],
			postsArray: [],
			postId: '',
			modalMainOpen: false
		};
	}

	componentDidMount() {
		const url = 'https://jsonplaceholder.typicode.com/users';
		this.props.fetchPosts();
		axios
			.get(url)
			.then((posts) =>
				this.setState({
					usersArray: posts.data
				})
			)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.newPost) {
			this.props.posts.unshift(nextProps.newPost);
			this.setState({
				modalMainOpen: false
			})
		}
	}

	componentDidUpdate(prevProps) {
		const { posts } = this.props;
		const { postsArray, postId } = this.state;

		if (prevProps.posts !== posts) {
			this.handleData();
		} else {
			if (postsArray) {
				let indexPosts = postsArray.findIndex((post) => post.id === postId);
				let n = Number(indexPosts);
				if (n !== -1) {
					const log = postsArray.splice(n, 1);
					this.setState({ postsArray });
				}
			}
		}
	}

	handleData = () => {
		const { posts } = this.props;
		const { postsArray } = this.state;
		const letang = posts;
		const copyPostsArray = postsArray;

		if (copyPostsArray.length <= 0) {
			this.setState({
				postsArray: letang
			})
		}
	}

	handleDeletedPost = (id) => {
		this.setState({
			postId: id
		})
	}
	toggleModal = (e) => {
		e.preventDefault();
		this.setState({
			modalMainOpen: true
		})
	}
	closeModal = (e) => {
		e.preventDefault();
		this.setState({
			modalMainOpen: false
		})
	}
	render() {
		const { match: { params } } = this.props;
		const { usersArray, postsArray, modalMainOpen } = this.state;
		let Loaders;

		const idLog = params.userId;
		const parseToNumber = Number(idLog);
		const copyPostsArray = postsArray;

		const nameAuthor = usersArray
			.filter(aurhorName => {
				return aurhorName.id === parseToNumber
			})
			.map((author => author.name))

		return (
			<div className="container-posts-main">
				<NavigationPosts
					nameAuthor={nameAuthor}
					toggleModal={this.toggleModal}
				/>				
				{
						Loaders = copyPostsArray.length 
					? 
						(copyPostsArray
							.filter(ee => ee.userId === parseToNumber)
							.map((postsUsers, i) => {
							return ( 
								<PostsCards
									key={i}
									handleDeletedPost={() => this.handleDeletedPost(postsUsers.id)}
									title={postsUsers.title}
									pathnameId={postsUsers.id}
									name={postsUsers.name}
								/>
							);
						})) 
					: 
						(Loaders = <Spinner 
										size={120} 
										spinnerColor={"#333"} 
										spinnerWidth={2} 
										visible={true} 
									/>
						)
				}
				<ReactModal
					isOpen={modalMainOpen}
					contentLabel="onRequestClose Example"
					onRequestClose={this.closeModal}
					className="Modal"
					overlayClassName="Overlay mainOverlay"
				>
					<PostForm
						userId={parseToNumber}
						closeModal={this.closeModal}
					/>
				</ReactModal>
			</div>
		);
	}
}
const mapStateToProps = (state) => ({
	posts: state.api.items,
	newPost: state.api.item,
	deletedPost2: state.api.deletedPost
});

ReactModal.setAppElement('#root');
export default connect(mapStateToProps, { fetchPosts })(Posts);