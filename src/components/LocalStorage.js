import React from 'react';
import { connect } from 'react-redux';
import { createPost } from '../actions/postActions';
import { FETCH_POSTS, NEW_POST, DELETED_POST, FETCH_COMMENTS, NEW_COMMENT } from '../actions/types';


export const persistData = store => next => action => {

	let localState = localStorage.getItem('posts');

	if (localState && typeof JSON.parse(localState) === 'object') {
		localState = JSON.parse(localState);
	}
	else {
		localState = Object.assign({}, { LocalStorageData: action.payload });
	}

	let result;
	let newAction;

	switch (action.type) {
		case FETCH_POSTS:
			newAction = { type: action.type };
			newAction.payload = localState;
			localStorage.setItem('posts', JSON.stringify(localState));
			result = next(newAction);
			return result;
		case NEW_POST:
			localState.LocalStorageData.push(action.payload);
			localStorage.setItem('posts', JSON.stringify(localState.LocalStorageData));
		case FETCH_POSTS:
			newAction = { type: action.type };
			newAction.payload = localState;
			localStorage.setItem('posts', JSON.stringify(localState));
			result = next(newAction);
			return result;
		case DELETED_POST:
			 localState.LocalStorageData
				.filter((deletePost, index) => {
					return (index + 1) !== action.payload;
				});
			localStorage.setItem('posts', JSON.stringify(localState));
		default:
			result = next(action);
			return result;
	}
}
connect(null, { createPost })(persistData);