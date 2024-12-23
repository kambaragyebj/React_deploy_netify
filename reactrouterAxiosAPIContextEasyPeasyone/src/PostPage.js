import { useParams, Link, useHistory } from "react-router-dom";
import { useStoreState, useStoreActions } from 'easy-peasy';

const PostPage = () => {
    
    const { id } = useParams();
    const history = useHistory();

    const deletePost = useStoreActions((actions) => actions.deletePost);
    const getPostById = useStoreState((state) => state.getPostById);
    const post = getPostById(id)

    // const post = posts.find(post => (post.id).toString() === id); // get individual post we want to display

    const handleDelete = (id) => { // the thunck as the ansy
        deletePost(id);
        history.push('/');
     
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