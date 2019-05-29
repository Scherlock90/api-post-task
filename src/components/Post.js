import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default function Post (props) {

    const [postsArray, setPostsArray] = useState([]);
    const { match: { params } } = props;
    const idLog = params.userId;
    const parseToNumber = Number(idLog);
    useEffect(() => {
        // axios.get(`https://jsonplaceholder.typicode.com/posts/${params.userId}`)
        axios.get(`https://jsonplaceholder.typicode.com/posts/`)
            .then(response =>
                response.data
            )
            .then(data => {
                setPostsArray(data);
            });
    }, [])
    const arraCop = postsArray.map(ee => ee.userId === parseToNumber)
    // .filter((ee2, i) => (
    //     <div key={i}>
    //         {ee2.body}
    //     </div>
    // ))
    console.log(postsArray);
    console.log(idLog);
    console.log(postsArray.map(ee => ee.userId === parseToNumber));
    console.log(arraCop);
    return (
        <div>
            <div style={styleComponent}>
                {arraCop}
            </div>
        </div>
    )
}
const styleComponent = {
    color: 'black'
}