import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Home = props => {
    const [state, setState] = useState('');

    useEffect(() => {
        axios.get('/api/hello')
            .then(res => setState(res.data))
    }, [])

    return (
        <div>
            Home
            <p>{state}</p>
        </div>
    )
};

export default Home;