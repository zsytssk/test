import { useRef, useEffect } from 'react';

export const useTimeout = (callback: () => void, delay: number | null) => {
    const savedCallback = useRef<() => void>();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (delay === null) {
            return;
        }
        const tick = () => {
            if (savedCallback.current) {
                savedCallback.current();
            }
        };
        const id = setTimeout(tick, delay);
        return () => clearTimeout(id);
    }, [delay]);
};
