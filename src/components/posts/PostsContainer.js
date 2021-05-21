import React from 'react'
import { addDescriptionActionCreator, editPostAC, deletePostAC } from '../../redux/operation'
import { getPosts } from '../../redux/postsReducer'
import Posts from './Posts'
import { connect } from 'react-redux';



class PostsContainers extends React.Component {

    componentDidMount() {
        const { getPosts } = this.props;
        getPosts()
    }


    render() {
        return (

            <Posts
                descriptions={this.props.descriptions}
                countSameWord={this.props.countSameWord}
                addPost={this.props.addDescriptionActionCreator}
                editPost={this.props.editPostAC}
                deletePost={this.props.deletePostAC}
            />
        )
    }
}


let mapStateToProps = (state) => {
    return {
        descriptions: state.postsPage.sliceArray,
        countSameWord: state.postsPage.countSameWord,
    }
}


const PostsContainer = connect(mapStateToProps, { getPosts, addDescriptionActionCreator, editPostAC, deletePostAC })
    (PostsContainers);

export default PostsContainer;