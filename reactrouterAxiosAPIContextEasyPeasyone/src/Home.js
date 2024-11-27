import Feed from './Feed';
import { useStoreState } from 'easy-peasy';

// we removed the props when using context Home = ({ posts, fetchError, isLoading })
const Home = ({ isLoading, fetchError }) => {
    // we are pulling search results from the data store
    const searchResults = useStoreState((state) => state.searchResults);
    // console.log(searchResults);
    return (
        <main className="Home">
            {isLoading && <p className="statusMsg">Loading posts...</p>}
            {!isLoading && fetchError && <p className="statusMsg" style={{ color: "red" }}>{fetchError}</p>}
            {!isLoading && !fetchError && (searchResults.length ? <Feed posts={searchResults} /> : <p className="statusMsg">No posts to display.</p>)}
        </main>
    )
}

export default Home
