const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Array to store blog posts (in-memory database)
let posts = [];

// Home route - display all posts
app.get('/', (req, res) => {
    res.render('index', { posts: posts });
});

// Route to display form for creating a new post
app.get('/new', (req, res) => {
    res.render('new');
});

// Route to handle form submission for creating a new post
app.post('/new', (req, res) => {
    const { title, content } = req.body;
    posts.push({ title: title, content: content });
    res.redirect('/');
});

// Route to display form for editing a post
app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    const post = posts[id];
    res.render('edit', { id: id, post: post });
});

// Route to handle form submission for editing a post
app.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const { title, content } = req.body;
    posts[id] = { title: title, content: content };
    res.redirect('/');
});

// Route to delete a post
app.post('/delete/:id', (req, res) => {
    const id = req.params.id;
    posts.splice(id, 1);
    res.redirect('/');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

