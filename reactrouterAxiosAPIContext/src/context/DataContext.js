import { createContext, useState, useEffect } from 'react';

import useAxiosFetch from '../hooks/useAxioFetch';

// you can have more than one context per application

const DataContext = createContext({});
// provide data to different components 
export const DataProvider = ({ children }) => {

    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
  
    const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts'); // api endpoint

    useEffect(() => {
        setPosts(data);
    }, [data])

    useEffect(() => {
        const filteredResults = posts.filter((post) =>
            ((post.body).toLowerCase()).includes(search.toLowerCase())
            || ((post.title).toLowerCase()).includes(search.toLowerCase()));

        setSearchResults(filteredResults.reverse());
    }, [posts, search])

    return ( // I removed width 
        <DataContext.Provider value={{ // the diffent props
            search, setSearch,
            searchResults, fetchError, isLoading,
            posts,setPosts
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;