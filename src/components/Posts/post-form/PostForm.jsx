import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Wrapper } from '../../common/index';
import { createPost } from '../../../actions/actions';

const PostForm = ({ closeModal, userId }) => {
	const dispatch = useDispatch();
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');

	const onChange = (e) => {
		const { name } = e.target;

		if (name === 'title') return setTitle(e.target.value);
		else if (name === 'body') return setBody(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const post = {
			title,
			body,
			userId,
		}
		dispatch(createPost(post));
		closeModal()
	};

	return (
		<div className="container-modal">
			<div className="container-my-modal" >
				<div className="container-post-form-main">
					<div className="title-post-form">Add comment</div>
					<div className="container-post-form2">
						<h1 className="title-modal-post">Add Comment</h1>
						<form onSubmit={onSubmit}>
							<table className="uk-table uk-table-justify uk-table-divider">
								<tbody>
									<Wrapper
										name={'Title'}
										children={
											<input
												className="text-place-post-form"
												name="title"
												type="text"
												placeholder="Title"
												value={title}
												onChange={onChange}
												required
											/>
										}
									/>
									<Wrapper
										name={'Body'}
										children={
											<textarea
												className="text-place-post-form text-area-main"
												name="body"
												placeholder="Body"
												value={body}
												onChange={onChange}
												required
											/>
										}
									/>
								</tbody>
							</table>
							<div className="container-button-post">
								<button onClick={closeModal} className="uk-button uk-button-danger main-button-style">
									Cancel
								</button>
								<button className="uk-button uk-button-primary main-button-style" type="submit">
									Save
								</button>
							</div>
						</form>
					</div>
					<div className="title-post-form-down"></div>
				</div>
			</div>
		</div>
	)
}

export default PostForm;