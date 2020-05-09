import { useRef, useEffect, useState } from 'react';

export const useInterval = (callback: () => void, delay: number | null) => {
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
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
    }, [delay]);
};

// export const useInterval = (delay: number) => {
//     const [intervalId, setId] = useState(0);
//     const savedCallback = useRef<() => void>();
//     const intervalRef = useRef<(callback: () => void) => void>();

//     intervalRef.current = (callback: () => void) => {
//         savedCallback.current = callback;
//     };

//     useEffect(() => {
//         if (delay === null) {
//             return;
//         }

//         const tick = () => {
//             if (savedCallback.current) {
//                 savedCallback.current();
//             }
//         };
//         const id = (setInterval(tick, delay) as any) as number;
//         setId(id);
//         return () => clearInterval(id);
//     }, [delay]);

//     const clear = () => {
//         clearInterval(intervalId);
//     };

//     return [intervalRef.current, clear] as [
//         (callback: () => void) => void,
//         () => void,
//     ];
// };
