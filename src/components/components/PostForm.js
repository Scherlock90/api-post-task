import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPost } from '../actions/postActions';

class PostForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			body: '',
			userId: null
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
			title: this.state.title,
			body: this.state.body,
			userId: this.props.userId
		};
		this.props.createPost(post);
	};

	render() {
		return (
			<div>
				<h1>Add Post</h1>
				<form onSubmit={this.onSubmit}>
					<div>
						<label>Title: </label>
						<hr />
						<input name="title" type="text" value={this.state.title} placeholder="Title" onChange={this.onChange} required />
					</div>
					<br />
					<div>
						<label>Body: </label>
						<hr />
						<textarea value={this.state.body} name="body" placeholder="Body" onChange={this.onChange} required />
					</div>
					<br />	
					<button className="uk-button uk-button-primary" type="submit">Save</button>
					<button className="uk-button uk-button-danger" onClick={this.props.closeModal}>Cancel</button>
				</form>
			</div>
		);
	}
}

// PostForm.propTypes = {
// 	createPost: PropTypes.func.isRequired
// };

export default connect(null, { createPost })(PostForm);
