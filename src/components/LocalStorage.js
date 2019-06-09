import React from 'react';
 import { FETCH_POSTS, NEW_POST, DELETED_POST, FETCH_COMMENTS, NEW_COMMENT } from '../actions/types';


export const persistData = store => next => action => {
 
	let localState = localStorage.getItem('posts');
	
	if (localState && typeof JSON.parse(localState) === 'object') {
	  localState = JSON.parse(localState);
	}
	else {
	  let all = action.payload;
	  let postsData = { all: all};
	  localState = Object.assign({}, {dataPost: postsData});
	}
	
	let result;
	let newAction;
	
	switch(action.type) {
	  case FETCH_POSTS:
		newAction = {type: action.type};
		newAction.payload = localState;
		localStorage.setItem('posts', JSON.stringify(localState));
		result = next(newAction);
		return result;
	  case NEW_POST:
		localState.dataPost.all.unshift(action.payload);
		localStorage.setItem('posts', JSON.stringify(localState));
	  case DELETED_POST:
		localState.dataPost.all = localState.dataPost.all.filter((recipe, index) => {
		  return (index + 1) !== recipe.action.payload;
		});
		localStorage.setItem('posts', JSON.stringify(localState));
	  default:
		result = next(action);
		return result;
	}
  }
