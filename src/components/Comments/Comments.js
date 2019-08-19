import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments } from '../../actions/actions';
import PostCommentForm from './CommentForm';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';
import axios from 'axios';
import Spinner from 'react-spinner-material';

const URL = 'https://jsonplaceholder.typicode.com';

function NavigationComments(props) {
    return (
        <div className="header-posts">
            <div 
                className="uk-child-width-1-3@m uk-grid-small uk-grid-match" 
                uk-grid="false"
            >
                <div>
                    <div className="uk-card uk-card-body main-cards-posts-left">
                        <h3 className="uk-card-title">
                            {props.comments.map(postBack => (
                                <Link className="arrow-back" key={postBack.id} to={{
                                    pathname: `/${postBack.userId}/posts`,
                                }}>
                                    <span uk-icon="icon: reply; ratio: 2"></span> 
                                    Back
                                </Link>
                            ))}
                        </h3>
                    </div>
                </div>
                <div>
                    <div className="uk-card uk-card-body main-cards-posts-center">
                        <h3 className="uk-card-title main-author-post">
                            {props.nameAuthor}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Post(props) {
    return (
        <div className="container-to-comments">
            <div className="container-post-cards one-post-container" >
                <div className="uk-text-center" uk-grid='false'>
                    <div className="uk-width-expand@m card-center-title">
                        <div className="uk-card uk-card-default uk-card-body">
                            <div className="title-one-post">
                                {props.title}
                            </div>
                            <div className="body-one-post">
                                {props.body}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ToogleComments(props) {
    return (
        <div className="container-for-buttons-commments">
            <div>
                <div className="uk-card uk-card-body main-cards-posts-left">
                    <h3 className="uk-card-title cont-button">
                        <span 
                            className="icon-add-comments" 
                            uk-icon={props.isActive ? 'icon:  arrow-up; ratio: 2' : 'icon:  arrow-down; ratio: 2'} 
                            onClick={props.activeComments}
                        ></span>
                        <div className="title-button-add-comment"> 
                            {props.isActive ? 'Hide comments' : 'Show Commments'} 
                        </div>
                    </h3>
                </div>
            </div>
            <div>
                <div className="uk-card uk-card-body main-cards-posts-right">
                    <h3 className="uk-card-title cont-button">
                        <span 
                            className="icon-add-comments" 
                            uk-icon="icon:  plus-circle; ratio: 2" 
                            onClick={props.toggleModal}
                        ></span>
                        <div className="title-button-add-comment">
                            Add Comment
                        </div>
                    </h3>
                </div>
            </div>
        </div>
    )
}

function CommentsCards(props) {
    return (
        <div className="container-post-cards">
            <div className="uk-text-center" uk-grid='false'>
                <div className="uk-width-expand@m card-center-title">
                    <div className="uk-card uk-card-default uk-card-body">
                        <h3 className="uk-card-title comments-header">
                            <div id="d1"> 
                                {props.name}
                            </div>
                            <div id="d2" className="span-email">
                                <a href="email" >
                                    {props.email}
                                </a>
                            </div>
                        </h3>
                        <div>
                            {props.body}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalMainOpen: false,
            usersArray: [],
            isActive: false,
            commentsArray: []
        };
    }

    componentDidMount() {
        this.props.fetchComments();

        axios.get(`${URL}/posts/`)
            .then(res =>
                this.setState({
                    commentsArray: res.data
                })
            )
        axios.get(`${URL}/users/`)
            .then(res =>
                this.setState({
                    usersArray: res.data
                })
            )
    }

    componentWillReceiveProps(nextProps) {
        const { comment } = this.props;
        if (nextProps.newComment) {
            comment.unshift(nextProps.newComment);
            this.setState({
                modalMainOpen: false
            })
        }
    }
    activeComments = (e) => {
        const { isActive } = this.state;
        e.preventDefault();
        if (isActive === false) {
            this.setState({
                isActive: true
            })
        } else {
            this.setState({
                isActive: false
            })
        }
    }

    toggleModal = (e) => {
        e.preventDefault();
        this.setState({
            modalMainOpen: true
        })
    }
    closeModal = (e) => {
        e.preventDefault();
        this.setState({
            modalMainOpen: false
        })
    }
    render() {

        const { match: { params }, comment } = this.props;
        const { commentsArray, usersArray, isActive, modalMainOpen } = this.state;
        const idLog = params.postId;
        const parseToNumber = Number(idLog);

        const copyCommentsArray = comment
            .filter(ee => ee.postId === parseToNumber);

        const comments = commentsArray
            .filter(aurhorName => {
                return aurhorName.id === parseToNumber
            });
        const nameAuthor = usersArray
            .filter(aurhorName => {
                return aurhorName.id === Number(comments
                    .map(ee => ee.userId))
            });
        let Loaders;
        
        return (
            <div className="container-posts-main">
                <NavigationComments
                    comments={comments.filter(ee => ee.userId)}
                    nameAuthor={nameAuthor.map((postsUsers => postsUsers.name))}
                />
                {Loaders = comments.length ? (comments.map((postsUsers, i) => {
                    return (
                        <Post
                            key={i}
                            title={postsUsers.title}
                            body={postsUsers.body}
                        />
                    );
                })) : (Loaders = <Spinner size={120} spinnerColor={"#333"} spinnerWidth={2} visible={true} />)
                }
                <ToogleComments
                    isActive={isActive}
                    activeComments={e => this.activeComments(e)}
                    toggleModal={this.toggleModal}
                />
                <div className={isActive ? 'container-comments-show--active' : 'container-comments-show'}>
                    {Loaders = copyCommentsArray.length ? (copyCommentsArray.map((comments, i) => {
                        return (
                            <CommentsCards
                                key={i}
                                name={comments.name}
                                body={comments.body}
                                email={comments.email}
                            />
                        );
                    })) : (Loaders = <Spinner size={120} spinnerColor={"#333"} spinnerWidth={2} visible={true} />)
                    }
                </div>
                <ReactModal
                    isOpen={modalMainOpen}
                    contentLabel="onRequestClose Example"
                    onRequestClose={this.closeModal}
                    className="Modal"
                    overlayClassName="Overlay mainOverlay"
                >
                    <PostCommentForm
                        postId={parseToNumber}
                        closeModal={this.closeModal}
                    />
                </ReactModal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    comment: state.api.itemComent,
    newComment: state.api.itemNewComment
});

ReactModal.setAppElement('#root');
export default connect(mapStateToProps, { fetchComments })(Comments);
