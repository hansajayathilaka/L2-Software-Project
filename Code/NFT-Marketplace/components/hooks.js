import { useEffect, useState } from "react";

export const useWidth = () => {
    const [width, setWidth] = useState(0);
    const handleResize = () => setWidth(window.innerWidth);
    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [width]);
    return width;
};

export const useHeight = () => {
    const [height, setHeight] = useState(0);
    const handleResize = () => setHeight(window.innerHeight);
    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [height]);
    return height;
};
