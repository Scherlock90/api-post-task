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
			<div className="container-post-form-main">
					<div className="title-post-form"> Add Post</div>
					<div className="container-post-form2">
						<h1 className="title-modal-post">Add Post</h1>
						<form onSubmit={this.onSubmit}>
							<table class="uk-table uk-table-justify uk-table-divider">
								<tbody>
									<tr>
										<td class="body-container-form">Title</td>
										<td class="body-container-form2">
											<input className="text-place-post-form" name="title" type="text" value={this.state.title} placeholder="Title" onChange={this.onChange} required />
										</td>
									</tr>
									<tr>
										<td class="body-container-form">Body</td>
										<td class="body-container-form2">
											<textarea className="text-place-post-form text-area-main" value={this.state.body} name="body" placeholder="Body" onChange={this.onChange} required />
										</td>
									</tr>
								</tbody>
							</table>
							<div className="container-button-post">

								<button className="uk-button uk-button-primary" type="submit">Save</button>
								<button className="uk-button uk-button-danger" onClick={this.props.closeModal}>Cancel</button>
							</div>
						</form>
					</div>
					<div className="title-post-form-down"> </div>
			</div>
		);
	}
}

// PostForm.propTypes = {
// 	createPost: PropTypes.func.isRequired
// };

export default connect(null, { createPost })(PostForm);
