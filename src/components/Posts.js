import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, deletedPost } from '../actions/postActions';
import PostForm from './PostForm';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';
import axios from 'axios';
import Spinner from 'react-spinner-material';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class Posts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalMainOpen: false,
			dataUsers: [],
			postId: '',
			dataPost: []
		};
	}
	informationAlert= () => {
		confirmAlert({
		  title: 'Delete post',
		  message: 'If you are sure you want to delete the post press delete the second time?',
		  buttons: [
			{
			  label: 'OK',
			//   onClick: () => alert('aaa')
			},
			// {
			//   label: 'No',
			// //   onClick: () => alert('Click No')
			// }
		  ]
		});
	  };

	//fetch data
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

	// send new props adding
	componentWillReceiveProps(nextProps) {
		if (nextProps.newPost) {
			this.props.posts.unshift(nextProps.newPost);
		}
	}

	//send new props deleting
	componentDidUpdate(prevProps, prevState) {
		const { dataPost } = this.state;
		const postsData = dataPost;
		if (postsData.length <= 0) {
			this.handleData();
		} else{
			console.log('stop');
			console.log(postsData);
		}
		const { posts } = this.props;
		const indexPosts = posts.findIndex((post) => post.id === this.state.postId);

		if (indexPosts !== -1) {
			this.informationAlert();
			const letang = posts.splice(indexPosts, 1);
			console.log(letang);
		}
	}
	handleData = () => {
		const { posts } = this.props;
		const letang = posts;
		this.setState({
			dataPost: letang
		})
	}

	handleDeletedPost = (id) => {
		this.setState({
			postId: id
		})
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
		const { dataUsers, dataPost } = this.state;

		const idLog = params.userId;
		const parseToNumber = Number(idLog);

		// const postItems = dataPost;
		const nameAuthor = dataUsers.filter(aurhorName => {
			return aurhorName.id === parseToNumber
		}
		).map((author => author.name))
		let loading;
		return (
			<div className="container-posts-main">
				<div className="header-posts">
					<div className="uk-child-width-1-3@m uk-grid-small uk-grid-match" uk-grid="false">
						<div id="h1">
							<div className="uk-card uk-card-body main-cards-posts-left">
								<h3 className="uk-card-title">
									<Link className="arrow-back" to="/">
										<span uk-icon="icon: reply; ratio: 2"></span> Back
                                	</Link>
								</h3>
							</div>
						</div>
						<div id="h2">
							<div className="uk-card uk-card-body main-cards-posts-center">
								<h3 className="uk-card-title main-author-post">{nameAuthor}</h3>
							</div>
						</div>
						<div id="h3">
							<div className="uk-card uk-card-body main-cards-posts-right">
								<h3 className="uk-card-title">
									<span className="icon-add-post" uk-icon="icon:  plus-circle; ratio: 2" onClick={this.toggleModal}></span>
								</h3>
							</div>
						</div>
					</div>
				</div>
				{loading = dataPost.length ? (dataPost.filter(ee => ee.userId === parseToNumber).map((postsUsers, i) => {
					return (
						<div className="container-post-cards" key={i} >
							<div className="uk-text-center" uk-grid='false'>
								<div id="c1" className="uk-width-auto@m">
									<div className="uk-card uk-card-default uk-card-body">
										<span className="icon-go-to-trash" uk-icon="icon: trash; ratio: 2" onClick={() => this.handleDeletedPost(postsUsers.id)} ></span>
									</div>
								</div>
								<div id="c2" className="uk-width-expand@m card-center-title">
									<div className="uk-card uk-card-default uk-card-body">
										{postsUsers.title}
									</div>
								</div>
								<div id="c3" className="uk-width-1-3@m">
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
				})) : (loading = <Spinner size={120} spinnerColor={"#333"} spinnerWidth={2} visible={true} />)
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
									<PostForm userId={parseToNumber} closeModal={this.closeModal} />
								</div>
							</div>
						</div>
					</div>
				</ReactModal>
			</div>
		);
	}
}
const mapStateToProps = (state) => ({
	posts: state.posts.items,
	newPost: state.posts.item,
	deletedPost2: state.posts.deletedPost
});

ReactModal.setAppElement('#root');
export default connect(mapStateToProps, { fetchPosts, deletedPost })(Posts);