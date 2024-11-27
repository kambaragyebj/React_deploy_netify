import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxiosFetch = (dataUrl) => {
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Mounting means putting elements into the DOM.
        let isMounted = true;
        const source = axios.CancelToken.source(); // define cancellation token for axios

        const fetchData = async (url) => {
            setIsLoading(true);
            try {  // definition recieve url
                const response = await axios.get(url, { 
                    cancelToken: source.token // allows us to cancel the request if we unmount the component
                });
                if (isMounted) {
                    setData(response.data);
                    setFetchError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setFetchError(err.message);
                    setData([]);
                }
            } finally {
                isMounted && setTimeout( () => setIsLoading(false), 2000);
            }
        }

        fetchData(dataUrl); // Hook receive the dataUrl 

        const cleanUp = () => {
            console.log(" Clean up function");
            isMounted = false;
            source.cancel();
        }

        return cleanUp;
    }, [dataUrl]);

    return { data, fetchError, isLoading };
}

export default useAxiosFetch;