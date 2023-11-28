
// Your Express app setup
const express = require('express');
const app = express();
app.use(express.json());

// Your BlogPost model (assuming you have one)
const BlogPost = require('./models/blogPost'); // Adjust the path as needed
app.post('/api/posts', async (req, res) => {
  const { content } = req.body;
try {
const newPost = new BlogPost({ content });
await newPost.save();
res.status(201).json({ message: 'Post created successfully', postId: newPost._id });
} catch (error) {
console.error('Error creating post:', error);
res.status(500).json({ error: 'Internal Server Error' });
}
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});