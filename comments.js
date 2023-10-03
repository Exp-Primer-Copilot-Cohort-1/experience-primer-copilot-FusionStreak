// Create web server application
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Use body-parser to parse the body of POST requests
app.use(bodyParser.urlencoded({ extended: false }));

const comments = [
    'Comment 1',
    'Comment 2',
    'Comment 3',
    'Comment 4',
    'Comment 5',
];

// Path: comments.js
// Display all comments
app.get('/', (req, res) => {
    res.render('comments/index', { comments });
});

// Path: comments.js
// Display form for new comment
app.get('/new', (req, res) => {
    res.render('comments/new');
});

// Path: comments.js
// Create new comment
app.post('/', (req, res) => {
    const comment = req.body.comment;
    comments.push(comment);
    res.redirect('/comments');
});

// Path: comments.js
// Show specific comment
app.get('/:id', (req, res) => {
    const id = req.params.id;
    const comment = comments[id];
    res.render('comments/show', { comment });
});

// Path: comments.js
// Display edit form for specific comment
app.get('/:id/edit', (req, res) => {
    const id = req.params.id;
    const comment = comments[id];
    res.render('comments/edit', { comment, id });
});

// Path: comments.js
// Update specific comment
app.post('/:id', (req, res) => {
    const id = req.params.id;
    const newComment = req.body.comment;
    comments[id] = newComment;
    res.redirect('/comments');
});

// Path: comments.js
// Delete specific comment
app.post('/:id/delete', (req, res) => {
    const id = req.params.id;
    comments.splice(id, 1);
    res.redirect('/comments');
});

module.exports = app;