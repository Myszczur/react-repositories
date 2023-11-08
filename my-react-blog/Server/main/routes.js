var express = require('express');
var router = express.Router();
var pool = require('./db');


//   POSTS ROUTES SECTION

router.get('/api/get/allposts', (request, response, next) => {
    pool.query(`SELECT * FROM posts 
                ORDER BY date_created DESC`,
        (queryError, queryResponse) => {
            response.json(queryResponse.rows);
        });
});

router.get('/api/get/post', (request, response, next) => {
    const post_id = request.query.post_id;

    pool.query(`SELECT * FROM posts
                WHERE pid=$1`,
        [post_id], (queryError, queryResponse) => {
            response.json(queryResponse.rows);
        });
});

router.post('/api/post/posttodb', (request, response, next) => {
    const values = [request.body.title,
    request.body.body,
    request.body.uid,
    request.body.username];
    pool.query(`INSERT INTO posts(title, body, user_id, author, date_created)
                VALUES($1, $2, $3, $4, NOW())`,
        values, (queryError, queryResponse) => {
            if (queryError) return next(queryError);
            response.json(queryResponse.rows);
        });
});

router.put('/api/put/post', (request, response, next) => {
    const values = [request.body.title,
    request.body.body,
    request.body.uid,
    request.body.pid,
    request.body.username];

    pool.query(`UPDATE posts SET title= $1, body=$2, user_id=$3, author=$5, date_created=NOW()
                WHERE pid = $4`, values,
        (queryError, queryResponse) => {
            console.log(queryResponse);
            console.log(queryError);
        });
});

router.delete('/api/delete/postcomments', (request, response, next) => {
    const post_id = request.body.post_id;
    pool.query(`DELETE FROM comments WHERE post_id = $1`, [post_id],
        (queryError, queryResponse) => {
            response.json(queryResponse.rows);
            console.log('====================================');
            console.log(queryError);
            console.log('====================================');
        });
});

router.delete('/api/delete/post', (request, response, next) => {
    const post_id = request.body.post_id;
    pool.query(`DELETE FROM posts WHERE pid = $1`, [post_id], (queryError, queryResponse) => {
        response.json(queryResponse.rows);
        console.log('====================================');
        console.log(queryError);
        console.log('====================================');
    });
});

router.put('/api/put/likes', (request, response, next) => {
    const uid = [request.body.uid];
    const post_id = String(request.body.post_id);

    const values = [uid, post_id];
    console.log(values);
    pool.query(`UPDATE posts
                SET like_user_id = like_user_id || $1, likes = likes + 1
                WHERE NOT (like_user_id @> $1)
                AND pid = ($2)`,
        values, (queryError, queryResponse) => {
            if (queryError) return next(queryError);
            console.log(queryResponse);
            response.json(queryResponse.rows);
        });
});

/*
    COMMENTS ROUTES SECTION
*/

router.post('/api/post/commentodb', (request, response, next) => {
    const values = [request.body.comment,
    request.body.user_id,
    request.body.username,
    request.body.post_id];

    pool.query(`INSERT INTO comments(comment, user_id, author, post_id, date_created)
                VALUES($1, $2, $3, $4, NOW())`, values, (queryError, queryResponse) => {
        response.json(queryResponse.rows);
        console.log('====================================');
        console.log(queryError);
        console.log('====================================');
    });
});

router.put('/api/put/commenttodb', (request, response, next) => {
    const values = [request.body.comment,
    request.body.user_id,
    request.body.post_id,
    request.body.username,
    request.body.cid];

    pool.query(`UPDATE comments SET comment = $1, user_id = $2, post_id = $3, author = $4, date_created = NOW()
                WHERE cid = $5`, values, (queryError, queryResponse) => {
        response.json(queryResponse.rows);
        console.log('====================================');
        console.log(queryError);
        console.log('====================================');
    });
});

router.delete('/api/delete/comment', (request, response, next) => {
    const cid = request.body.comment_id;
    console.log('====================================');
    console.log(cid);
    console.log('====================================');

    pool.query(`DELETE FROM comments
                 WHERE cid = $1`, [cid], (queryError, queryResponse) => {
        response.json(queryResponse);
        console.log('====================================');
        console.log(queryError);
        console.log('====================================');
    });
});

router.get('/api/get/allpostcomments', (request, response, next) => {
    const post_id = String(request.query.post_id);

    pool.query(`SELECT * FROM comments
                WHERE post_id = $1`, [post_id], (queryError, queryResponse) => {
        response.json(queryResponse.rows);
    });
});

/*
  USER PROFILE SECTION
*/

router.post('/api/posts/userprofiletodb', (request, response, nexr) => {
    const values = [request.body.profile.nickname,
    request.body.profile.emil,
    request.body.profile.email_verified];

    pool.query(`INSERT INTO users(username, email, email_verified, date_created)
                VALUES($1, $2, $3, NOW())
                ON CONFLICT DO NOTHING`, values, (queryError, queryResponse) => {
        response.json(queryResponse.rows);
    });
});

router.get('/api/get/userprofilefromdb', (request, response, next) => {
    const email = request.body.email;
    console.log('====================================');
    console.log(email);
    console.log('====================================');

    pool.query(`SELECT * FROM users
                WHERE email = $1`, [email], (queryError, queryResponse) => {
        response.json(queryResponse.rows);
    });
});

// Retrieve another users profile from db based on username 
router.get('/api/get/otheruserprofilefromdb', (request, response, next) => {
    const username = String(request.query.username);

    pool.query(`SELECT * FROM users
                WHERE username = $1`,
        [username], (queryError, queryResponse) => {
            response.json(queryResponse.rows)
        });
});

//Get another user's posts based on username
router.get('/api/get/otheruserposts', (request, response, next) => {
    const username = String(request.query.username);

    pool.query(`SELECT * FROM posts
                WHERE author = $1`,
        [username], (queryError, queryResponse) => {
            response.json(queryResponse.rows);
        });
});

module.exports = router;