import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';


// we element the props 
const Nav = () => {
  // pull from easy peasy
  const posts = useStoreState((state) => state.posts);
  const search = useStoreState((state) => state.search);
  const setSearch = useStoreActions((actions) => actions.setSearch);
  const setSearchResults = useStoreActions((actions) => actions.setSearchResults);

  // filters and set our search results

  useEffect(() => {
    const filteredResults = posts.filter((post) =>
        ((post.body).toLowerCase()).includes(search.toLowerCase())
        || ((post.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults.reverse());
}, [posts, search, setSearchResults])

  // console.log(posts);
  return (
    <nav className="Nav">
      <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="search"> Search Posts</label>
          <input 
              id="search"
              type="text"
              placeholder="Search Posts"
              value={search}
              onChange={(e) => setSearch(e.target.value)}

            />

      </form>
      <ul>
          <li> <Link to="/">Home</Link></li>
          <li> <Link to="/post">Post</Link></li>
          <li> <Link to="/about">About</Link></li>

      </ul>

    </nav>
  )
}

export default Nav
