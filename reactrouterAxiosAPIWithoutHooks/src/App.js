import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import EditPost from './EditPost';
import { Route, Switch, useHistory}  from 'react-router-dom'
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from  './api/post';
import useWindowSize from './hooks/useWindowSize';
import useAxiosFetch from './hooks/useAxioFetch';


function App() {
   
  const [posts, setPosts] = useState([]);

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const history = useHistory();
// customs hooks
  const { width } = useWindowSize();
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts'); // define ur api endpoint here or the local json url

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts'); // api for retrieving all data
        setPosts(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range 
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }

    fetchPosts();
  }, [])

  // // foreach post that includes the search body set it to lower case
  // //(post) => ((post.body).toLowerCase()).includes(search.toLowerCase())
  useEffect(() => {
    const filteredResults = posts.filter((post) =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults.reverse()); // reverse sets the search results from the newpost
  }, [posts, search])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if post doesnt have length add 1
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    const allPosts = [...posts, newPost];
    try {
      const response = await api.post('/posts', newPost); // api for creating or posting data
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      history.push('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost); // api for updating | patching for specific field
      setPosts(posts.map(post => post.id === id ? { ...response.data } : post)); // ...response.data is the newedited data
      setEditTitle('');
      setEditBody('');
      history.push('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

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

      <div className="App">
        <Header title = "React Js Blog" width={width}/>
        <Nav search={search} setSearch={setSearch}/>
        <Switch>
            <Route exact path="/">
              <Home posts={searchResults} />
            </Route>
            <Route exact path="/post">
              <NewPost
                  handleSubmit={handleSubmit}
                  postTitle={postTitle}
                  setPostTitle={setPostTitle}
                  postBody={postBody}
                  setPostBody={setPostBody} 
              />
            </Route>
            <Route path="/edit/:id">
              <EditPost
                posts={posts}
                handleEdit={handleEdit}
                editTitle={editTitle}
                setEditTitle={setEditTitle}
                editBody={editBody}
                setEditBody={setEditBody}
              />
            </Route>
            <Route path="/post/:id">
              <PostPage  posts={posts} handleDelete={handleDelete}/>
            </Route>
            <Route path="/about" component={About} />
            <Route path="*" component={Missing} />
        </Switch>
        <Footer />
      </div>
  );
  
}

export default App;
