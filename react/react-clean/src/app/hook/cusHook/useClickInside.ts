import { useEffect } from 'react';

export const useClickInside = (
    ref: React.MutableRefObject<HTMLElement | null>,
    callback: () => void,
) => {
    const handleClick = (e: MouseEvent) => {
        if (ref.current && ref.current.contains(e.target as Node)) {
            callback();
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    });
};

export const useClickOutside = (
    ref: React.MutableRefObject<HTMLElement | null>,
    callback: () => void,
) => {
    const handleClick = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            callback();
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    });
};
