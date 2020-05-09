import React, { useMemo, useState, memo } from 'react';

export const UseMemoFc = () => {
    const [name, setName] = useState('名称');
    const [content, setContent] = useState('内容');
    return (
        <>
            <button onClick={() => setName(new Date().getTime() + '')}>
                name
            </button>
            <button onClick={() => setContent(new Date().getTime() + '')}>
                content
            </button>
            <UseMemoItem name={name} content={content}></UseMemoItem>
        </>
    );
};

function UseMemoItem({ name, content }: { [key: string]: string }) {
    function changeName(_name: string) {
        return 'T:' + _name;
    }

    const otherName = useMemo(() => changeName(name), [name]);

    return (
        <>
            <div>{name}</div>
            <div>{content}</div>
            <div>useMemo:> {otherName}</div>
            <MemoFc test={content} />
        </>
    );
}

type Props = { test: string };
const SubComponent = (props: Props) => <>memo:> {props.test}</>;
const MemoFc = memo<Props>(SubComponent, (prev, next) => {
    console.log(`memo:>`, prev, next);
    return prev.test === next.test;
});
