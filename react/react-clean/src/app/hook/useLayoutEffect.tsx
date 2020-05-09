import React, { useEffect, useLayoutEffect, useState } from 'react';

export const UseLayoutEffect = () => {
    const [count, setCount] = useState(0);

    /** 在dom创建之后 页面渲染之前 同步执行(其他的和useEffect一样) */
    useLayoutEffect(() => {
        console.log(`useLayoutEffect:>`, count);
        setCount(count + 1);
    }, []);

    /**
     * 页面渲染之后执行, 会导致渲染刷新
     * 要避免这种情形, 用useLayoutEffect
     */
    useEffect(() => {
        console.log(`useEffect:>`, count);
        setCount(count + 1);
    }, []);

    return (
        <>
            <div>{count}</div>
        </>
    );
};
