import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments } from '../actions/postActions';
import PostCommentForm from './PostCommentForm';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';
import axios from 'axios';
import TextTruncate from 'react-text-truncate';

class Comments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalMainOpen: false,
            dataUsers: [],
            isActive: false,
            dataPost: []
		};
	}
	//fecthuje stare dane
	componentDidMount() {
		this.props.fetchComments();
		
        axios.get(`https://jsonplaceholder.typicode.com/posts/`)
        .then(res => this.setState({
            dataPost: res.data
        }))
        
	}

	//sluży do przesyłania nowych propoów
	componentWillReceiveProps(nextProps) {
		if (nextProps.newComment) {
			this.props.comment.unshift(nextProps.newComment);
		}
	}
     activeComments = (e) => {
        e.preventDefault();
        if (this.state.isActive === false){
        this.setState({
            isActive:  true
        })   
        }  else {
            this.setState({
                isActive:  false
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

		const { match: { params } } = this.props;
		const idLog = params.postId;
		const parseToNumber = Number(idLog);

		const commentsItem = this.props.comment.filter(ee => ee.postId === parseToNumber);
		// console.log(postItems);
		// console.log(this.state.dataUsers);

		const nameAuthor = this.state.dataUsers.filter(aurhorName => {
			return aurhorName.id === parseToNumber
		}
		)

        const posts2 = this.state.dataPost.filter(aurhorName => {
            return aurhorName.id === parseToNumber
        })
		return (
			<div className="container-posts-main">
            <div className="header-posts">
                <div className="uk-child-width-1-3@m uk-grid-small uk-grid-match" uk-grid="false">
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
                                <span className="icon-add-comments" uk-icon={this.state.isActive ? 'icon:  arrow-up; ratio: 2': 'icon:  arrow-down; ratio: 2'} onClick={e => this.activeComments(e)}></span>
                                <div className="title-button-add-comment"> {this.state.isActive ? 'Hide comments': 'Show Commments'}</div>
                            </h3>
                        </div>
                    </div>
                    <div>
                        <div className="uk-card uk-card-body main-cards-posts-right">
                            <h3 className="uk-card-title cont-button">
                                <span className="icon-add-comments" uk-icon="icon:  plus-circle; ratio: 2" onClick={this.toggleModal}></span>
                                <div className="title-button-add-comment">Add Comment</div>
                            </h3>
                        </div>
                    </div>
                </div>
                <div className={this.state.isActive ? 'container-comments-show--active': 'container-comments-show'}>
                    {commentsItem.map((commentsPost, i) => {
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
					isOpen={this.state.modalMainOpen}
					contentLabel="onRequestClose Example"
					onRequestClose={this.closeModal}
					className="Modal"
					overlayClassName="Overlay mainOverlay"
				>
					<div className="containerModal">
						<div className="containerMyModal" >
							<div className="cardPost">
								<div className="box">
									<div className="little-add-post-title">Add post</div>
									<div className="bigger-add-post-title">Add post</div>
									<PostCommentForm postId={parseToNumber} />
									<button className="uk-button uk-button-secondary" onClick={this.closeModal}>Cancel</button>
								</div>
							</div>
						</div>
					</div>
				</ReactModal>
			</div>
		);
	}
}

// Posts.propTypes = {
// 	// posts is postReducer name
// 	fetchPosts: PropTypes.func.isRequired,
// 	posts: PropTypes.array.isRequired,
// 	newPost: PropTypes.object
// };

const mapStateToProps = (state) => ({
    comment: state.posts.itemComent,
    newComment: state.posts.itemNewComment
});

export default connect(mapStateToProps, { fetchComments })(Comments);
