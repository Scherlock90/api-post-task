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
		const post = {
			name: this.state.name,
			body: this.state.body,
			postId: this.props.postId
		};
		this.props.createComment(post);
	};

	render() {
		return (
			<div>
				<h1>Add Post</h1>
				<form onSubmit={this.onSubmit}>
					<div>
						<label>Title: </label>
						<hr />
						<input name="name" type="text" value={this.state.name} onChange={this.onChange} />
					</div>
					<br />
					<div>
						<label>Body: </label>
						<hr />
						<textarea value={this.state.body} name="body" onChange={this.onChange} />
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
