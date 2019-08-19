import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../../actions/actions';

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
			<div className="containerModal">
				<div className="containerMyModal" >
					<div className="container-post-form-main">
						<div className="title-post-form"> 
							Add Post
						</div>
						<div className="container-post-form2">
							<h1 className="title-modal-post">
								Add Post
							</h1>
							<form onSubmit={this.onSubmit}>
								<table className="uk-table uk-table-justify uk-table-divider">
									<tbody>
										<tr>
											<td className="body-container-form">
												Title
											</td>
											<td className="body-container-form2">
												<input 
													className="text-place-post-form" 
													name="title" 
													type="text" 
													placeholder="Title" 
													value={this.state.title} 
													onChange={this.onChange} 
													required 
												/>
											</td>
										</tr>
										<tr>
											<td className="body-container-form">
												Body
											</td>
											<td className="body-container-form2">
												<textarea 
													className="text-place-post-form text-area-main" 
													name="body" 
													placeholder="Body" 
													value={this.state.body} 
													onChange={this.onChange} 
													required 
												/>
											</td>
										</tr>
									</tbody>
								</table>
								<div className="container-button-post">
									<button 
										className="uk-button uk-button-danger main-button-style" 
										onClick={this.props.closeModal}
									>
										Cancel
									</button>
									<button 
										className="uk-button uk-button-primary main-button-style" 
										type="submit"
									>
										Save
									</button>
								</div>
							</form>
						</div>
						<div className="title-post-form-down"> </div>
					</div>
				</div>
			</div>
		);
	}
}
export default connect(null, { createPost })(PostForm);