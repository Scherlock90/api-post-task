import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';
import axios from 'axios';
import '../Styles/main.css';

export default function PostComments(props) {
    const [modalMainOpen, setModalMainOpen] = useState(false);
    const [commentsArray, setCommentsArray] = useState([]);
    const [authorCommentsName, setAuthorCommentsName] = useState([]);
    const [usersName, setUsersName] = useState([]);
    const [postsOne, setPostsOne] = useState([]);
    const [isActive, setActive] = useState(false);

    const [name, setNameAdd] = useState('');
    const [email, setEmailAdd] = useState('');
    const [body, setBodyAdd] = useState('');

    const { match: { params } } = props;
    const idLog = params.postId;
    const parseToNumber = Number(idLog);

    const URL = 'https://jsonplaceholder.typicode.com';


    function toggleModal(modalMainOpen) {
        setModalMainOpen(true)
        return modalMainOpen
    }
    function closeModal(modalMainOpen) {
        setModalMainOpen(false)
        return modalMainOpen
    }
    function activeComments () {
        if (isActive === false){
        setActive(true);    
        }  else {
          setActive(false)
        }
      }

    const handleChangeName = event => {
        setNameAdd(event.target.value)
    }
    const handleChangeEmail = event => {
        setEmailAdd(event.target.value)
    }
    const handleChangeBody = event => {
        setBodyAdd(event.target.value)
    }
    const handleSubmit = event => {
        event.preventDefault();

        axios.post(`${URL}/comments`, { name, email,body })
            .then(res => {
                setNameAdd(res.data.name);
                setEmailAdd(res.data.email);
                setBodyAdd(res.data.body)
                console.log(res);
                console.log(res.data);
            })
    }

    useEffect(() => {
        axios.get(`${URL}/comments/`)
            .then(response =>
                response.data
            )
            .then(data => {
                setCommentsArray(data);
            });
        axios.get(`${URL}/posts/`)
            .then(res => res.data)
            .then(data => {
                setPostsOne(data);
            });
        axios.get(`${URL}/users/`)
            .then(res => res.data)
            .then(data => {
                setUsersName(data);
            });
    }, [])
    const arraCop = commentsArray.filter(postUsers => {
        return postUsers.postId === parseToNumber
    })
    const posts2 = postsOne.filter(aurhorName => {
        return aurhorName.id === parseToNumber
    })
    const nameAuthor = usersName.filter(aurhorName => {
        return aurhorName.id === Number(posts2.map(ee => ee.userId))
    })
    console.log(posts2.map(ee => ee.userId));
    console.log(arraCop.map(ee => ee));
    return (
        <div className="container-posts-main">
            <div className="header-posts">
                <div className="uk-child-width-1-3@m uk-grid-small uk-grid-match" uk-grid="false">
                    <div>
                        <div className="uk-card uk-card-body main-cards-posts-left">
                            <h3 className="uk-card-title">
                                {posts2.filter(ee => ee.userId).map(postBack => (
                                    <Link className="arrow-back" to={{
                                        pathname: `/${postBack.userId}/posts`,
                                    }}>
                                        <span uk-icon="icon: reply; ratio: 2"></span> Back
                                    </Link>
                                ))}
                            </h3>
                        </div>
                    </div>
                    <div>
                        <div className="uk-card uk-card-body main-cards-posts-center">
                            <h3 className="uk-card-title main-author-post"> 
                                {nameAuthor.map((postsUsers => postsUsers.name))}
                            </h3>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="container-to-comments">
                {posts2.map((postsUsers, i) => {
                    return (
                        <div className="container-post-cards one-post-container" key={i} >
                            <div className="uk-text-center" uk-grid='false'>
                                <div className="uk-width-expand@m card-center-title">
                                    <div className="uk-card uk-card-default uk-card-body">
                                        <div className="title-one-post">
                                            {postsUsers.title}
                                        </div>
                                        <div className="body-one-post">
                                            {postsUsers.body}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
                }
            </div>
            <div>
            <div className="container-for-buttons-commments">
                    <div>
                        <div className="uk-card uk-card-body main-cards-posts-left">
                            <h3 className="uk-card-title cont-button">
                                <span className="icon-add-comments" uk-icon={isActive ? 'icon:  arrow-up; ratio: 2': 'icon:  arrow-down; ratio: 2'} onClick={e => activeComments(e)}></span>
                                <div className="title-button-add-comment"> {isActive ? 'Hide comments': 'Show Commments'}</div>
                            </h3>
                        </div>
                    </div>
                    <div>
                        <div className="uk-card uk-card-body main-cards-posts-right">
                            <h3 className="uk-card-title cont-button">
                                <span className="icon-add-comments" uk-icon="icon:  plus-circle; ratio: 2" onClick={toggleModal}></span>
                                <div className="title-button-add-comment">Add Comment</div>
                            </h3>
                        </div>
                    </div>
                </div>
                <div className={isActive ? 'container-comments-show--active': 'container-comments-show'}>
                    {arraCop.map((commentsPost, i) => {
                        return (
                            <div className="container-post-cards" key={i} >
                                <div className="uk-text-center" uk-grid='false'>
                                    <div className="uk-width-expand@m card-center-title">
                                        <div className="uk-card uk-card-default uk-card-body">
                                            <h3 className="uk-card-title comments-header"><span> {commentsPost.name}</span> <span className="span-email"><a href="email" >{commentsPost.email}</a></span></h3>
                                            <div>
                                                {commentsPost.body}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                    }
                </div>
            </div>
            <ReactModal
                isOpen={modalMainOpen}
                contentLabel="onRequestClose Example"
                onRequestClose={closeModal}
                className="Modal"
                overlayClassName="Overlay mainOverlay"
            >
                <div className="containerModal">
                    <div className="containerMyModal" >
                        <div className="cardPost">
                            <div className="box">
                                <div className="little-add-post-title">Add comment</div>
                                <div className="bigger-add-post-title">Add comment </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="cotainer-label">
                                        <label>
                                            <div className="container-input-label">
                                                <div className="title-span-add-post">Name</div>
                                                <div>
                                                    <input type="text" name="name" value={name} placeholder="Name" onChange={handleChangeName} />
                                                </div>
                                            </div>
                                        </label>
                                        <label>
                                            <div className="container-input-label">
                                                <div className="body-span-add-post">Email</div>
                                                <div>
                                                    <input type="text" name="email" value={email} placeholder="Email" onChange={handleChangeEmail} />
                                                </div>
                                            </div>
                                        </label>
                                        <label>
                                            <div className="container-input-label">
                                                <div className="body-span-add-post">Body</div>
                                                <div>
                                                    <input type="text" name="body" value={body} placeholder="Body" onChange={handleChangeBody} />
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                    <div>
                                        <button className="uk-button uk-button-primary" type="submit">Save</button>
                                        <button className="uk-button uk-button-secondary" onClick={closeModal}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </ReactModal>
        </div>
    )
}

