import { useEffect } from 'react';

export const useComponentDidMount = (callback: () => void) => {
    useEffect(() => {
        callback();
    }, []);
};
export const useComponentWillUnMount = (callback: () => void) => {
    useEffect(
        () => () => {
            callback();
        },
        [],
    );
};
