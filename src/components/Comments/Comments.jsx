import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReactModal from 'react-modal';
import Spinner from 'react-spinner-material';

import { fetchUsers, fetchPosts, filteredComment } from '../../duck/actions/index';
import { compareData } from '../common/utils';

import NavigationComments from './navigation-comments/NavigationComments';
import CommentForm from './comment-form/CommentForm';
import Post from './post/Post';
import ToggleComments from './toggle-comments/ToggleComments';
import CommentsCards from './comment-cards/CommentsCards';

const Comments = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const [modalMainOpen, setModalMainOpen] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const comments = useSelector(state => state.comment.comment);
    const users = useSelector(state => state.users.users);
    const post = useSelector(state => state.posts.posts);

    const fetchData = () => {
        try {
            dispatch(fetchUsers())
            dispatch(fetchPosts())
            dispatch(filteredComment(+params.postId))
        } catch (error) {
            console.error(error)
        }
    };

    const activeComments = () => setIsActive(!isActive);

    const toggleModal = () => setModalMainOpen(!modalMainOpen);

    useEffect(() => {
        fetchData();
        return () => fetchData();
    }, [])

    const filteredPost = compareData(post, 'id', +params.postId);
    const filteredAuthor = compareData(users, 'id', filteredPost.map(it => it.userId)[0]);
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
            {
                filteredAuthor.length
                ?
                    (
                        <NavigationComments
                            post={filteredAuthor}
                            nameAuthor={filteredAuthor[0].name}
                        />
                    )
                : null
            }
                {
                    filteredPost.length
                        ?
                            (filteredPost.map(({ title, body }, i) => (
                                    <Post
                                        key={i}
                                        title={title}
                                        body={body}
                                    />
                                )
                            ))
                        : Loaders
                }
            <ToggleComments
                isActive={isActive}
                activeComments={() => activeComments()}
                toggleModal={() => toggleModal()}
            />
            <div className={isActive ? 'container-comments-show--active' : 'container-comments-show'}>
                {
                    comments
                        ?
                            (
                                comments.map(({ name, body, email }, i) => (
                                        <CommentsCards
                                            key={i}
                                            name={name}
                                            body={body}
                                            email={email}
                                        />
                                    )
                                )
                            )
                        : Loaders
                }
            </div>
            <ReactModal
                isOpen={modalMainOpen}
                contentLabel="onRequestClose Example"
                onRequestClose={toggleModal}
                className="Modal"
                overlayClassName="Overlay mainOverlay"
            >
                <CommentForm
                    postId={+params.postId}
                    closeModal={() => toggleModal()}
                />
            </ReactModal>
        </div>
    );
}

export default Comments;
