import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createComment } from '../../../actions/actions';

const CommentForm = ({ closeModal, postId }) => {
    const dispatch = useDispatch();
	const [name, setName] = useState('');
	const [body, setBody] = useState('');
	const [email, setEmail] = useState('');

	const onChange = (e) => {
		const { name } = e.target;

		if(name === 'name') return setName(e.target.value);
		else if(name === 'email') return setEmail(e.target.value);
		else if(name === 'body') return setBody(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const comment = {
			name: name,
			body: body,
			email: email,
			postId,
		};
		dispatch(createComment(comment));
		closeModal()
	};

	const trArray = [
		{
			name: 'name',
			type: 'text',
			value: name,
			placeholder: 'Name',
		},
		{
			name: 'email',
			type: 'email',
			value: email,
			placeholder: 'E-mail',
		}
	];

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
									{trArray.map(({name, type, value, placeholder}) => (
										<tr key={name}>
											<td className="body-container-form">{ name }</td>
											<td className="body-container-form2">
												<input
													className="text-place-post-form"
													name={name}
													type={type}
													value={value}
													placeholder={placeholder}
													onChange={onChange}
													required
												/>
											</td>
										</tr>
									))}
									<tr>
										<td className="body-container-form">Body</td>
										<td className="body-container-form2">
											<textarea
												className="text-place-post-form text-area-main"
												value={body}
												name="body"
												placeholder="Body"
												onChange={onChange}
												required
											/>
										</td>
									</tr>
								</tbody>
							</table>
							<div className="container-button-post">
								<button	onClick={closeModal} className="uk-button uk-button-danger main-button-style">
									Cancel
								</button>
								<button	className="uk-button uk-button-primary main-button-style" type="submit">
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

export default CommentForm;