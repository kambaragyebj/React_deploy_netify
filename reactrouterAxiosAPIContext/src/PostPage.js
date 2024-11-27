import React from 'react'
import EditPost from './EditPost';
import { useParams, Link, useHistory } from "react-router-dom";
import { useContext } from 'react';
import api from './api/post';
import DataContext from './context/DataContext';

const PostPage = () => {
    const { posts, setPosts} = useContext(DataContext);
    const { id } = useParams();
    const history = useHistory();
    const post = posts.find(post => (post.id).toString() === id); // get individual post we want to display

    const handleDelete = async (id) => {
        try {
          await api.delete(`/posts/${id}`); // api for delete
          const postsList = posts.filter(post => post.id !== id);
          setPosts(postsList);
          history.push('/'); /// this will take us back to home page
        } catch (err) {
          console.log(`Error: ${err.message}`);
        }
      }
    return (
        <main className="PostPage">
          {/* post && .it means if a post is true then we going to display it */}
            <article className="post"> 
                {post &&
                    <>
                        <h2>{post.title}</h2>
                        <p className="postDate">{post.datetime}</p>
                        <p className="postBody">{post.body}</p>
                          {/* edit button */}
                        < Link to={`/edit/${post.id}`}>
                            <button className='editButton'>Edit Post</button>
                         </Link>

                        <button className="deleteButton" onClick={() => handleDelete(post.id)}>
                            Delete Post
                        </button>
                    </>
                }
                {!post &&
                    <>
                        <h2>Post Not Found</h2>
                        <p>Well, that's disappointing.</p>
                        <p>
                            <Link to='/'>Visit Our Homepage</Link>
                        </p>
                    </>
                }
            </article>
        </main>
    )
}

export default PostPage