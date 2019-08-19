import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/actions';
import PostForm from './PostForm';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';
import axios from 'axios';
import Spinner from 'react-spinner-material';
import 'react-confirm-alert/src/react-confirm-alert.css';
import TextTruncate from 'react-text-truncate';

function NavigationPosts (props) {
	return (
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
						<h3 className="uk-card-title main-author-post">
							{props.nameAuthor}
						</h3>
					</div>
				</div>
				<div id="h3">
					<div className="uk-card uk-card-body main-cards-posts-right">
						<h3 className="uk-card-title">
							<span className="icon-add-post" uk-icon="icon:  plus-circle; ratio: 2" onClick={props.toggleModal}></span>
						</h3>
					</div>
				</div>
			</div>
		</div>
	)
}

function PostsCards (props) {
	return (
		<div className="container-post-cards">
			<div className="uk-text-center" uk-grid='false'>
				<div id="c1" className="uk-width-auto@m">
					<div className="uk-card uk-card-default uk-card-body">
						<span className="icon-go-to-trash" uk-icon="icon: trash; ratio: 2" onClick={props.handleDeletedPost} ></span>
					</div>
				</div>
				<div id="c2" className="uk-width-expand@m card-center-title">
					<div className="uk-card uk-card-default uk-card-body">
						<TextTruncate
							truncateText="…"
							line={1}
							text={props.title}
						/>
					</div>
				</div>
				<div id="c3" className="uk-width-1-3@m">
					<div className="uk-card uk-card-default uk-card-body button-go-to-post">
						<Link 
							to={{
								pathname: `/${props.pathnameId}/post-comments`,
							}} username={props.name}
							className="uk-button"> 
							<span uk-icon="icon: chevron-right; ratio: 2"></span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

class Posts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			usersArray: [],
			postsArray: [],
			postId: '',
			modalMainOpen: false
		};
	}
	//fetch data
	componentDidMount() {
		const url = 'https://jsonplaceholder.typicode.com/users';
		this.props.fetchPosts();
		axios
			.get(url)
			.then((posts) =>
				this.setState({
					usersArray: posts.data
				})
			)
	}

	// send new props adding
	componentWillReceiveProps(nextProps) {
		if (nextProps.newPost) {
			this.props.posts.unshift(nextProps.newPost);
			this.setState({
				modalMainOpen: false
			})
		}
	}

	//send new props deleting
	componentDidUpdate(prevProps, prevState) {
		const { posts } = this.props;
		const { postsArray, postId } = this.state;

		if (prevProps.posts !== posts) {
			this.handleData();
		} else {
			if (postsArray) {
				let indexPosts = postsArray.findIndex((post) => post.id === postId);
				let n = Number(indexPosts);
				if (n !== -1) {
					const log = postsArray.splice(n, 1);
					this.setState({ postsArray });
				}
			}
		}
	}

	handleData = (e) => {
		const { posts } = this.props;
		const { postsArray } = this.state;
		const letang = posts;
		const copyPostsArray = postsArray;

		if (copyPostsArray.length <= 0) {
			this.setState({
				postsArray: letang
			})
		} else {
			console.log('stop')
		}
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
		const { match: { params }, posts } = this.props;
		const { usersArray, postsArray, modalMainOpen } = this.state;

		const idLog = params.userId;
		const parseToNumber = Number(idLog);
		let Loaders;
		const copyPostsArray = postsArray;

		const nameAuthor = usersArray
			.filter(aurhorName => {
				return aurhorName.id === parseToNumber
			})
			.map((author => author.name))

		return (
			<div className="container-posts-main">
				<NavigationPosts
					nameAuthor={nameAuthor}
					toggleModal={this.toggleModal}
				/>				
				{Loaders = copyPostsArray.length ? (copyPostsArray.filter(ee => ee.userId === parseToNumber).map((postsUsers, i) => {
					return ( 
						<PostsCards
							key={i}
							handleDeletedPost={() => this.handleDeletedPost(postsUsers.id)}
							title={postsUsers.title}
							pathnameId={postsUsers.id}
							name={postsUsers.name}
						/>
					);
				})) : (Loaders = <Spinner size={120} spinnerColor={"#333"} spinnerWidth={2} visible={true} />)
				}
				<ReactModal
					isOpen={modalMainOpen}
					contentLabel="onRequestClose Example"
					onRequestClose={this.closeModal}
					className="Modal"
					overlayClassName="Overlay mainOverlay"
				>
					<PostForm
						userId={parseToNumber}
						closeModal={this.closeModal}
					/>
				</ReactModal>
			</div>
		);
	}
}
const mapStateToProps = (state) => ({
	posts: state.api.items,
	newPost: state.api.item,
	deletedPost2: state.api.deletedPost
});

ReactModal.setAppElement('#root');
export default connect(mapStateToProps, { fetchPosts })(Posts);