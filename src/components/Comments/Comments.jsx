import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReactModal from 'react-modal';
import Spinner from 'react-spinner-material';

import { fetchComments } from '../../ducks/actions/index';
import { compareData } from '../common/utils';
import { errorInformation } from '../../utils/utils';
import { useNotification } from '../../custom-hooks/index';

import NavigationComments from './navigation-comments/NavigationComments';
import { Notification } from '../common/index';
import CommentForm from './comment-form/CommentForm';
import Post from './post/Post';
import ToggleComments from './toggle-comments/ToggleComments';
import CommentsCards from './comment-cards/CommentsCards';

const Comments = () => {
  const dispatch = useDispatch();

  const params = useParams();

  const [modalMainOpen, setModalMainOpen] = useState(false);

  const [isActive, setIsActive] = useState(false);

  const comments = useSelector(({ comment: { comment } }) => comment);

  const users = useSelector(({ users: { users } }) => users);

  const post = useSelector(({ posts: { posts } }) => posts);

  const notification = useSelector(({ notification: { notification } }) => notification);

  const { notificationClassName } = useNotification(notification);

  const fetchData = () => dispatch(fetchComments());

  const activeComments = () => setIsActive(!isActive);

  const toggleModal = () => setModalMainOpen(!modalMainOpen);

  useEffect(() => {
    try {
      fetchData();
    } catch (err) {
      errorInformation(err);
    }

    return () => fetchData();
  }, []);

  const filteredPost = compareData(post, 'id', +params.postId);

  const filteredAuthor = compareData(
    users,
    'id',
    filteredPost.map(({ userId }) => userId)[0],
  );

  const Loaders = (
    <Spinner size={120} spinnerColor='#333' spinnerWidth={2} visible={true} />
  );

  return (
    <div className='container-posts-main'>
      {filteredAuthor.length ? (
        <NavigationComments post={filteredAuthor} nameAuthor={filteredAuthor[0].name} />
      ) : null}
      {filteredPost.length
        ? filteredPost.map(({ title, body }, i) => (
            <Post key={i} title={title} body={body} />
          ))
        : Loaders}
      {notification && (
        <Notification
          {...{ notificationClassName }}
          notification={
            <>
              {[...notification].map((letter, id) => (
                <span key={id}>{letter}</span>
              ))}
            </>
          }
        />
      )}
      <ToggleComments
        isActive={isActive}
        activeComments={() => activeComments()}
        toggleModal={() => toggleModal()}
      />
      <div
        className={
          isActive ? 'container-comments-show--active' : 'container-comments-show'
        }
      >
        {comments.length > 1
          ? comments
              .filter(({ postId }) => postId === +params.postId)
              .map(({ name, body, email }, i) => (
                <CommentsCards key={i} name={name} body={body} email={email} />
              ))
          : Loaders}
      </div>
      <ReactModal
        isOpen={modalMainOpen}
        contentLabel='onRequestClose Example'
        onRequestClose={toggleModal}
        className='Modal'
        overlayClassName='Overlay mainOverlay'
        ariaHideApp={false}
      >
        <CommentForm postId={+params.postId} closeModal={() => toggleModal()} />
      </ReactModal>
    </div>
  );
};

export default Comments;
