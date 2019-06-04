import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';
import PostForm from './PostForm';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';
import axios from 'axios';
import TextTruncate from 'react-text-truncate';
import Spinner from 'react-spinner-material';

class Posts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalMainOpen: false,
			dataUsers: []
		};
	}
	//fecthuje stare dane
	componentDidMount() {
		this.props.fetchPosts();
		axios
			.get(' https://jsonplaceholder.typicode.com/users')
			.then((posts) =>
				this.setState({
					dataUsers: posts.data
				})
			)
	}

	//sluży do przesyłania nowych propoów
	componentWillReceiveProps(nextProps) {
		if (nextProps.newPost) {
			this.props.posts.unshift(nextProps.newPost);
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
		const idLog = params.userId;
		const parseToNumber = Number(idLog);

		const postItems = this.props.posts.filter(ee => ee.userId === parseToNumber);
		// console.log(postItems);
		// console.log(this.state.dataUsers);

		const nameAuthor = this.state.dataUsers.filter(aurhorName => {
			return aurhorName.id === parseToNumber
		}
		)
		let loading;
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
								<h3 className="uk-card-title main-author-post">{ loading = nameAuthor.length ? (nameAuthor.map((author => author.name)))
								: ( loading = loading =  <Spinner size={120} spinnerColor={"#333"} spinnerWidth={2} visible={true} /> )}</h3>
							</div>
						</div>
						<div>
							<div className="uk-card uk-card-body main-cards-posts-right">
								<h3 className="uk-card-title">
									<span className="icon-add-post" uk-icon="icon:  plus-circle; ratio: 2" onClick={this.toggleModal}></span>
								</h3>
							</div>
						</div>
					</div>
				</div>
				{ loading = postItems.length ? (postItems.map((postsUsers, i) => {
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
				})) : ( loading = loading =  <Spinner size={120} spinnerColor={"#333"} spinnerWidth={2} visible={true} />)
				}
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
									<PostForm userId={parseToNumber} />
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
	posts: state.posts.items,
	newPost: state.posts.item
});

export default connect(mapStateToProps, { fetchPosts })(Posts);
