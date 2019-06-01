import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';
import PostForm from './PostForm';

class Posts extends Component {

	//fecthuje stare dane
	componentDidMount() {
		this.props.fetchPosts();
	}

	//sluży do przesyłania nowych propoów
	componentWillReceiveProps(nextProps) {
		if (nextProps.newPost) {
			this.props.posts.unshift(nextProps.newPost);
		}
	}

	render() {

		const { match: { params } } = this.props;
		const idLog = params.userId;
		const parseToNumber = Number(idLog);

		const postItems = this.props.posts.filter(ee => ee.userId == parseToNumber);
		

		return (
			<div><PostForm userId={idLog} />
				<h1>Posts</h1>
				{postItems.map((post) => {
			return (
				<div key={post.id}>
					<h3>{post.title}</h3>
					<p>{post.body}</p>
				</div>
			);
		})}
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
