import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';
import axios from 'axios';
import TextTruncate from 'react-text-truncate';
import '../Styles/main.css';
import PostForm from './components/PostForm';
import Posts from './components/Posts'
import { FETCH_POSTS, NEW_POST } from './actions/types'

import { connect } from 'react-redux';
import { fetchPosts } from '../components/actions/postActions';

// const fetchPosts = () => (dispatch) => {
//     axios
//         .get('https://jsonplaceholder.typicode.com/posts')
//         .then((posts) =>
//             dispatch({
//                 type: FETCH_POSTS,
//                 payload: posts.data
//             })
//         )
//         .catch((err) => {
//             console.log(err);
//         });
// };

function Post(props) {

    const [postsArray, setPostsArray] = useState([]);
    const [authorName, setAuthorName] = useState([]);
    const [title, setTitleAdd] = useState('');
    const [body, setBodyAdd] = useState('');
    const [modalMainOpen, setModalMainOpen] = useState(false);

    const { match: { params } } = props;
    const idLog = params.userId;
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

    const handleChangeTitle = event => {
        setTitleAdd(event.target.value)
    }
    const handleChangeBody = event => {
        setBodyAdd(event.target.value)
    }
    const handleSubmit = event => {
        event.preventDefault();
        axios.post(`${URL}/posts`, { title: title, body: body })
            .then(res => {
                setTitleAdd(res.data.title);
                setBodyAdd(res.data.body);
                console.log(res);
                console.log(res.data);
            })
    }

    useEffect(() => { 
        
        props.fetchPosts();
        
        // axios.get(`${URL}/posts/`)
        //     .then(response =>
        //         response.data
        //     )
        //     .then(data => {
        //         setPostsArray(data);
        //     });
        axios.get(`${URL}/users`)
            .then(res => res.data)
            .then(data => {
                setAuthorName(data);
            });
           
    }, [])
    const arraCop = postsArray;
    console.log(postsArray);
    // const arraCop = postsArray.filter(postUsers => {
    //     return postUsers.userId === parseToNumber
    // })
    const nameAuthor = authorName.filter(aurhorName => {
        return aurhorName.id === parseToNumber
    }
    )

    const postItems = props.posts.filter(ee => ee.userId == parseToNumber).map((post) => {
        return (
            <div key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
            </div>
        );
    });
    // console.log(postsArray);
    return (
        <div className="container-posts-main">
            <div className="header-posts">
                <div className="uk-child-width-1-3@m uk-grid-small uk-grid-match" uk-grid="false">
                    <div>
                        <div className="uk-card uk-card-body main-cards-posts-left">
                            <h3 className="uk-card-title">
                                <Link className="arrow-back" to="/">
                                    <span uk-icon="icon: reply; ratio: 2"></span> Back
                                </Link>
                            </h3>
                        </div>
                    </div>
                    <div>
                        <div className="uk-card uk-card-body main-cards-posts-center">
                            <h3 className="uk-card-title main-author-post">{nameAuthor.map((author => author.name))}</h3>
                        </div>
                    </div>
                    <div>
                        <div className="uk-card uk-card-body main-cards-posts-right">
                            <h3 className="uk-card-title">
                                <span className="icon-add-post" uk-icon="icon:  plus-circle; ratio: 2" onClick={toggleModal}></span>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div> {title}</div> */}
            {/* <Posts /> */}
            {/* {arraCop} */}
            {postItems}
            {/* {arraCop.map((postsUsers, i) => {
                return (
                    <div className="container-post-cards" key={i} >
                        <div className="uk-text-center" uk-grid='false'>
                            <div className="uk-width-auto@m">
                                <div className="uk-card uk-card-default uk-card-body">
                                    <span className="icon-go-to-trash" uk-icon="icon: trash; ratio: 2"></span>
                                </div>
                            </div>
                            <div className="uk-width-expand@m card-center-title">
                                <div className="uk-card uk-card-default uk-card-body">
                                    <TextTruncate
                                        line={1}
                                        element="span"
                                        truncateText="…"
                                        text={postsUsers.title}
                                    />
                                </div>
                            </div>
                            <div className="uk-width-1-3@m">
                                <div className="uk-card uk-card-default uk-card-body button-go-to-post">
                                    <Link to={{
                                        pathname: `/${postsUsers.id}/post-comments`,
                                    }} key={postsUsers.id} username={postsUsers.name}
                                        className="uk-button"> <span uk-icon="icon: chevron-right; ratio: 2"></span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })
            } */}
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
                                <div className="little-add-post-title">Add post</div>
                                <div className="bigger-add-post-title">Add post</div>
                                <form onSubmit={handleSubmit}>
                                    <PostForm />
                                    {/* <div className="cotainer-label">
                                        <label>
                                            <div className="container-input-label">
                                                <div className="title-span-add-post">Title</div>
                                                <div>
                                                    <input type="text" name="title" value={title} placeholder="Title" onChange={handleChangeTitle} />
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
                                    </div> */}
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


const mapStateToProps = (state) => ({
	posts: state.posts.items,
	newPost: state.posts.item
});

export default connect(mapStateToProps, { fetchPosts })(Post);