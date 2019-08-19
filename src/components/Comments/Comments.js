import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments } from '../../actions/actions';
import PostCommentForm from './CommentForm';
import ReactModal from 'react-modal';
import axios from 'axios';
import Spinner from 'react-spinner-material';
import NavigationComments from './NavigationComments';
import Post from './Post';
import ToogleComments from './ToogleComments';
import CommentsCards from './CommentsCards';

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

        const URL = 'https://jsonplaceholder.typicode.com';
        this.props.fetchComments();

        axios
            .get(`${URL}/posts/`)
            .then(res =>
                this.setState({
                    commentsArray: res.data
                })
            )
        axios
            .get(`${URL}/users/`)
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
        this.setState(({ isActive }) => ({ isActive: !isActive }))
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
                {
                        Loaders = comments.length 
                    ? 
                        (comments.map((postsUsers, i) => {
                        return (
                            <Post
                                key={i}
                                title={postsUsers.title}
                                body={postsUsers.body}
                            />
                        )})) 
                    : 
                        (Loaders = <Spinner 
                                        size={120} 
                                        spinnerColor={"#333"} 
                                        spinnerWidth={2} 
                                        visible={true} 
                                    />
                        )
                }
                <ToogleComments
                    isActive={isActive}
                    activeComments={e => this.activeComments(e)}
                    toggleModal={this.toggleModal}
                />
                <div className={isActive ? 'container-comments-show--active' : 'container-comments-show'}>
                    {
                            Loaders = copyCommentsArray.length 
                        ? 
                            (copyCommentsArray.map((comments, i) => {
                            return (
                                <CommentsCards
                                    key={i}
                                    name={comments.name}
                                    body={comments.body}
                                    email={comments.email}
                                />
                            )})) 
                        : 
                            (Loaders = <Spinner 
                                            size={120} 
                                            spinnerColor={"#333"} 
                                            spinnerWidth={2} 
                                            visible={true} 
                                        />
                            )
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
