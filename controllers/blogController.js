const BlogPost = require('../models/blogPost'); 

const blogController = {
getAllPosts: async (req, res) => {
try {
const posts = await BlogPost.find().sort({ createdAt: 'desc' });
res.render('blog/home', { posts }); 
} catch (err) {
console.error(err);
res.status(500).send('Internal Server Error');
}
},
getPostById: async (req, res) => {
const postId = req.params.id;
try {
const post = await BlogPost.findById(postId);
res.render('blog/post', { post }); 
} catch (err) {
console.error(err);
res.status(404).send('Post not found');
}
},

createPost: async (req, res) => {
const { title, content } = req.body;

try {
const newPost = new BlogPost({ title, content, creator: req.user.id });
await newPost.save();
res.redirect('/dashboard');
} catch (err) {
console.error(err);
res.status(500).send('Internal Server Error');
}
},

updatePost: async (req, res) => {
const postId = req.params.id;
const { title, content } = req.body;
try {
await BlogPost.findByIdAndUpdate(postId, { title, content });
res.redirect('/dashboard');
} catch (err) {
console.error(err);
res.status(500).send('Internal Server Error');
}
},

deletePost: async (req, res) => {
const postId = req.params.id;
try {
await BlogPost.findByIdAndDelete(postId);
res.redirect('/dashboard'); 
} catch (err) {
console.error(err);
res.status(500).send('Internal Server Error');
}
},
};

module.exports = blogController;