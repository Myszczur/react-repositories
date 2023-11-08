import React, { useContext } from "react";
import axios from 'axios';
import history from '../utils/history';
import Context from '../utils/context';
import Textfield from '@material-ui/core/Textfield';

const AddPost = () => {
    const context = useContext(Context);

    const hadnleSubmit = (event) => {
        event.preventDefault();

        const user_id = context.dbProfileState[0].uid;
        const username = context.dbProfileState[0].username;
        const data = {
            title: event.target.title.value,
            body: event.target.body.value,
            username: username,
            uid: user_id
        }

        axios.post('/api/post/posttodb', data)
            .then((response) => {
                console.log('====================================');
                console.log(response);
                console.log('====================================');
            })
            .catch((err) => {
                console.log('====================================');
                console.log(err);
                console.log('====================================');
            })
            .then(setTimeout(() => history.replace('/')));
    }

    return (
        <>
            <form onSubmit={hadnleSubmit}>
                <Textfield
                    id='title'
                    label='Title'
                    margin='normal' />
                <br />
                <Textfield
                    id='body'
                    label='Body'
                    multiline
                    rowsMax='4'
                    margin='normal' />
                <br />
                <button type="submit">Submit</button>
            </form>
            <br />
            <button onClick={() => history.replace('/posts')}>Cancel</button>
        </>
    );
}

export default AddPost;