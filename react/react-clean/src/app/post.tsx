import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

const getData = (dispatch: Dispatch<any>) => {
    console.log(2);
    return fetch('https://www.baidu.com/img/bd_logo1.png').then(json => {
        console.log(`test:>post`, 2);
        dispatch({ type: 'DATA_LOADED', payload: json });
    });
};

export default function Post() {
    const dispatch = useDispatch();
    useEffect(() => {
        console.log(`test:>post`, 1);
        getData(dispatch);
    }, []);
    return <div> </div>;
}
