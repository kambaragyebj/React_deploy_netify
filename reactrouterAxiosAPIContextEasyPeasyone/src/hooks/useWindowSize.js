import { useState, useEffect } from "react";

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined, // with and height of the browser
        height: undefined
    });

    useEffect(() => {

        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        handleResize(); // call it once at load time

        window.addEventListener("resize", handleResize);

        // const cleanUp = () => {

        //     console.log("runs if use Effect dependecy changes");
        //     window.removeEventListener("resize", handleResize);
        // }
        
        // return cleanUp;


        return () => window.removeEventListener("resize", handleResize);
    }, []) // user effer to runl at load time

    return windowSize;
}

export default useWindowSize;