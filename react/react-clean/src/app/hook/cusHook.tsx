import React, { useState, useRef } from 'react';
import { useInterval } from './cusHook/useInterval';
import { useTimeout } from './cusHook/useTimeout';
import { usePrevious } from './cusHook/usePrevious';
import { useClickInside, useClickOutside } from './cusHook/useClickInside';
import { useFetch } from './cusHook/useFetch';
import {
    useComponentDidMount,
    useComponentWillUnMount,
} from './cusHook/useComponentDidMount';

export function UseCusHookDemo() {
    return (
        <>
            <UseFetchDemo />
            <UseClickInsideDemo />
            <UseIntervalDemo></UseIntervalDemo>
            <UseTimeOutDemo></UseTimeOutDemo>
            <UsePreviousDemo></UsePreviousDemo>
            <UseComponentDidMount />
        </>
    );
}
export function UseIntervalDemo() {
    const [count, setCount] = useState(0);

    useInterval(
        () => {
            setCount(count + 1);
        },
        count < 50 ? 1000 : null,
    );
    return <div>useInterval:>{count}</div>;
}
export function UseTimeOutDemo() {
    const [count, setCount] = useState(0);

    useTimeout(
        () => {
            setCount(count + 1);
        },
        count < 50 ? 1000 : null,
    );
    return <div>useTimeout:>{count}</div>;
}

export const UsePreviousDemo = () => {
    const [count, setCount] = useState(0);
    const preVal = usePrevious(count);

    return (
        <div>
            usePrevious:>{count}:{preVal}
            <button
                onClick={() => {
                    setCount(count + 1);
                }}
            >
                click
            </button>
        </div>
    );
};

export const UseClickInsideDemo = () => {
    const ref1 = useRef<HTMLDivElement>(null);
    const ref2 = useRef<HTMLDivElement>(null);
    const [status1, setStatus1] = useState('');
    const [status2, setStatus2] = useState('');
    const clickHandler1 = () => {
        setStatus1('click');
    };
    const clickHandler2 = () => {
        setStatus2('click_outside');
    };
    useClickInside(ref1, clickHandler1);
    useClickOutside(ref2, clickHandler2);

    return (
        <div
            style={{
                display: 'inline-block',
                padding: 30,
                border: '1px solid #000',
            }}
        >
            <div
                ref={ref1}
                style={{
                    display: 'inline-block',
                    padding: 30,
                    border: '1px solid #000',
                    marginRight: '10px',
                }}
            >
                <div
                    style={{
                        display: 'inline-block',
                        padding: 30,
                        border: '1px solid #000',
                        marginRight: '10px',
                    }}
                >
                    line1 {status1}
                </div>
            </div>
            <div
                ref={ref2}
                style={{
                    display: 'inline-block',
                    padding: 30,
                    border: '1px solid #000',
                }}
            >
                line2 {status2}
            </div>
        </div>
    );
};

const UseFetchDemo = () => {
    const { response, error } = useFetch(
        'https://jsonplaceholder.typicode.com/todos/1',
        // 'https://www.baidu.com/img/bd_logo1.png',
    );

    return (
        <div>
            <div>response: {response && response.title}</div>
            <div>error: {error && error.toString()}</div>
        </div>
    );
};

const UseComponentDidMount = () => {
    useComponentDidMount(() => {
        console.log(`useComponentDidMount`);
    });
    useComponentWillUnMount(() => {
        console.log(`useComponentWillUnMount`);
    });

    return <div>UseComponentDidMount: checkout this is console</div>;
};
