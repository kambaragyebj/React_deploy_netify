

import Feed from './Feed';
import { useContext } from 'react';
import DataContext from './context/DataContext';
// we removed the props when using context Home = ({ posts, fetchError, isLoading })
const Home = () => {

    const { searchResults, fetchError, isLoading} = useContext(DataContext);
    return (
        <main className="Home">
            {isLoading && <p className="statusMsg">Loading posts...</p>}
            {!isLoading && fetchError && <p className="statusMsg" style={{ color: "red" }}>{fetchError}</p>}
            {!isLoading && !fetchError && (searchResults.length ? <Feed posts={searchResults} /> : <p className="statusMsg">No posts to display.</p>)}
        </main>
    )
}

export default Home


// import Feed from './Feed';

// const Home = ({ posts, fetchError, isLoading}) => {
//     return (
//         <main className="Home">
//             {posts.length ? (
//                 <Feed posts={posts} />
//             ) : (
//                 <p style={{ marginTop: "2rem" }}>
//                     No posts to display.
//                 </p>
//             )}
//         </main>
//     )
// }

// export default Home

// The above does not use our custom hook useAxioFetch