import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createComment } from '../actions/postActions';

class PostCommentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			body: '',
			email: '',
			postId: null
		};
	}

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	onSubmit = (e) => {
		e.preventDefault();
		const comment = {
			name: this.state.name,
			body: this.state.body,
			email: this.state.email,
			postId: this.props.postId
		};
		this.props.createComment(comment);
	};

	render() {
		return (
			<div>
				<h1>Add Post</h1>
				<form onSubmit={this.onSubmit}>
					<div>
						<label>Title: </label>
						<hr />
						<input name="name" type="text" placeholder="Name" value={this.state.name} onChange={this.onChange} required />
					</div>
					<br />
					<div>
						<label>Body: </label>
						<hr />
						<textarea value={this.state.body} name="body" placeholder="Body" onChange={this.onChange} required />
					</div>
					<br />	
					<div>
						<label>email: </label>
						<hr />
						<textarea value={this.state.email} name="email" placeholder="e-mail" onChange={this.onChange}  required/>
					</div>
					<br />	
					<button type="submit">Submit</button>
				</form>
			</div>
		);
	}
}

// PostForm.propTypes = {
// 	createPost: PropTypes.func.isRequired
// };

export default connect(null, { createComment })(PostCommentForm);
