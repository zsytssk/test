import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
} from 'react';

/**  */
const UseImperativeHandleParent = () => {
    const ref = useRef(null as any);
    const onClick = () => {
        ref.current.focus();
    };

    return (
        <>
            <div>
                <FancyInput ref={ref} />;
            </div>
            <button onClick={onClick}>click</button>
        </>
    );
};

const UseImperativeHandle = (props: any, ref: any) => {
    const inputRef = useRef((null as unknown) as HTMLInputElement);
    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus();
        },
    }));
    useEffect(() => {
        console.log(`test:>2`, props, ref);
    }, []);
    console.log(`test:>1`, props, ref);
    return <input ref={inputRef} />;
};

const FancyInput = forwardRef(UseImperativeHandle);

export default UseImperativeHandleParent;
