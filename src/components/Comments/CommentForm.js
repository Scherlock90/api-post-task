import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createComment } from '../../actions/actions';

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
			<div className="containerModal">
				<div className="containerMyModal" >
					<div className="container-post-form-main">
						<div className="title-post-form"> 
							Add comment
						</div>
						<div className="container-post-form2">
							<h1 className="title-modal-post">
								Add Comment
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
													name="name" 
													type="text" 
													value={this.state.name} 
													placeholder="Name" 
													onChange={this.onChange}
													required 
												/>
											</td>
										</tr>
										<tr>
											<td className="body-container-form">
												E-mail:
											</td>
											<td className="body-container-form2">
												<input 
													className="text-place-post-form" 
													name="email" 
													type="email" 
													value={this.state.email} 
													placeholder="E-mail" 
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
													value={this.state.body} 
													name="body" 
													placeholder="Body" 
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

export default connect(null, { createComment })(PostCommentForm);