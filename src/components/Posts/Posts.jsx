import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReactModal from 'react-modal';
import Spinner from 'react-spinner-material';
import 'react-confirm-alert/src/react-confirm-alert.css';

import PostForm from './post-form/PostForm';
import PostsCards from './post-cards/PostsCards';
import NavigationPosts from './navigation-posts/NavigationPosts';
import { Notification } from '../common/index';

import { deletePost, fetchPosts } from '../../ducks/actions/index';
import { compareData } from '../common/utils';
import { errorInformation } from '../../utils/utils';
import { useNotification } from '../../custom-hooks/index';

const Posts = () => {
  const dispatch = useDispatch();

  const params = useParams();

  const [modalMainOpen, setModalMainOpen] = useState(false);

  const post = useSelector(({ posts: { posts } }) => posts);

  const users = useSelector(({ users: { users } }) => users);

  const notification = useSelector(({ notification: { notification } }) => notification);

  const { notificationClassName } = useNotification(notification);

  const fetchData = () => dispatch(fetchPosts());

  const toggleModal = () => setModalMainOpen(!modalMainOpen);

  const handleDeletedPost = id => dispatch(deletePost(+id));

  const Loaders = (
    <Spinner size={120} spinnerColor='#333' spinnerWidth={2} visible={true} />
  );

  useEffect(() => {
    try {
      fetchData();
    } catch (err) {
      errorInformation(err);
    }

    return () => fetchData();
  }, []);

  const filteredAuthor = compareData(users, 'id', +params.userId);

  return (
    <div className='container-posts-main'>
      <NavigationPosts
        nameAuthor={filteredAuthor.map(({ name }) => name)}
        toggleModal={toggleModal}
      />
      {notification && <Notification {...{ notification, notificationClassName }} />}
      {post.length
        ? post
            .filter(({ userId }) => userId === +params.userId)
            .map(({ id, title, name }, i) => (
              <PostsCards
                key={i}
                handleDeletedPost={() => handleDeletedPost(id)}
                title={title}
                pathnameId={id}
                name={name}
              />
            ))
        : Loaders}
      <ReactModal
        isOpen={modalMainOpen}
        contentLabel='onRequestClose Example'
        onRequestClose={toggleModal}
        className='Modal'
        overlayClassName='Overlay mainOverlay'
        ariaHideApp={false}
      >
        <PostForm userId={+params.userId} closeModal={toggleModal} />
      </ReactModal>
    </div>
  );
};

export default Posts;
