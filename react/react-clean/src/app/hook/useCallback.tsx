import React, { useCallback, useState } from 'react';

export const UseCallback = () => {
    const [count, setCount] = useState(0);

    /** 只有再 decency 发生改变时才会更新 */
    const onClick1 = useCallback(() => {
        console.log(count);
        setCount(count + 1);
    }, []);

    /** 这个是最好的写法 */
    const onClick2 = useCallback(() => {
        console.log(count);
        setCount(count + 1);
    }, [count]);

    /** 每次都会重新创建函数 也能达到目标 就是消耗太大了 */
    const onClick3 = () => {
        console.log(count);
        setCount(count + 1);
    };
    return (
        <>
            <div>{count}</div>
            <button onClick={onClick1}>click1</button>
            <button onClick={onClick2}>click2</button>
            <button onClick={onClick3}>click3</button>
        </>
    );
};
