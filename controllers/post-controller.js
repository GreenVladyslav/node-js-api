const Post = require('../models/post');
const createPath = require('../helpers/create-path');

const handleError = (res, error) => {
  console.log(error);
  const title = 'Error-page';
  res.status(404).render(createPath('error'), { title });
};

const getPosts = (req, res) => {
  const title = 'Posts';
  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => res.render(createPath('posts'), { posts, title }))
    .catch((error) => handleError(res, error));
};

const getPost = (req, res) => {
  const title = 'Post';
  Post.findById(req.params.id)
    .then((post) => res.render(createPath('post'), { post, title }))
    .catch((error) => handleError(res, error));
};

const deletePost = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then((result) => res.sendStatus(200))
    .catch((error) => handleError(res, error));
};

const getEditPost = (req, res) => {
  const title = 'Edit Post';
  Post.findById(req.params.id)
    .then((post) => res.render(createPath('edit-post'), { post, title }))
    .catch((error) => handleError(res, error));
};

const editPost = (req, res) => {
  const { title, text, author } = req.body;
  const { id } = req.params;

  Post.findByIdAndUpdate(req.params.id, { title, text, author })
    .then((result) => res.redirect(`/posts/${id}`))
    .catch((error) => handleError(res, error));
};

const getAddPost = (req, res) => {
  const title = 'Add post';
  res.render(createPath('add-post'), { title });
};

const addPost = (req, res) => {
  const { title, author, text } = req.body;
  const post = new Post({ title, author, text });
  post
    .save()
    .then((result) => {
      // res.send(result); // Send отправляем результат на UI
      res.redirect('/posts');
    })
    .catch((error) => handleError(res, error));
};

module.exports = { getPost, deletePost, getEditPost, editPost, getPosts, getAddPost, addPost };
