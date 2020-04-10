import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReactModal from 'react-modal';
import Spinner from 'react-spinner-material';
import 'react-confirm-alert/src/react-confirm-alert.css';

import PostForm from './post-form/PostForm';
import PostsCards from './post-cards/PostsCards';
import NavigationPosts from './navigation-posts/NavigationPosts';

import { fetchUsers, deletePost, filteredPosts } from '../../duck/actions/index';
import { compareData } from '../common/utils';

const Posts = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const [modalMainOpen, setModalMainOpen] = useState(false);

	const post = useSelector(state => state.posts.posts);
	const users = useSelector(state => state.users.users);

	const fetchData = async () => {
		try {
			await dispatch(fetchUsers())
			await dispatch(filteredPosts(+params.userId))
		} catch (error) {
			console.error(error)
		}
	};

	const toggleModal = () => setModalMainOpen(!modalMainOpen);

	const handleDeletedPost = id => dispatch(deletePost(+id));

	useEffect(() => {
		fetchData();
		return () => fetchData();
	}, [])

	const filteredAuthor = compareData(users, 'id', +params.userId);
	const Loaders = (
		<Spinner
			size={120}
			spinnerColor={"#333"}
			spinnerWidth={2}
			visible={true}
		/>
	)

	return (
		<div className="container-posts-main">
		<NavigationPosts
				nameAuthor={filteredAuthor.map(author => author.name)}
				toggleModal={toggleModal}
			/>
			{
				post
					?
						(
							post
								.filter(post => post.userId === +params.userId)
								.map((postsUsers, i) => (
									<PostsCards
										key={i}
										handleDeletedPost={() => handleDeletedPost(postsUsers.id)}
										title={postsUsers.title}
										pathnameId={postsUsers.id}
										name={postsUsers.name}
									/>
								))
						)
					: Loaders
			}
			<ReactModal
				isOpen={modalMainOpen}
				contentLabel="onRequestClose Example"
				onRequestClose={toggleModal}
				className="Modal"
				overlayClassName="Overlay mainOverlay"
			>
				<PostForm userId={+params.userId} closeModal={toggleModal}/>
			</ReactModal>
		</div>
	)
}

export default Posts;