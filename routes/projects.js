const express = require('express');
const router = express.Router({ mergeParams: true });
const { User } = require('./../app//models');

router.get('/', async (req, res) => {
    const { userId } = req.params;
    try {
      //const posts = await Project.findAll({ where: { userId } });
      //res.json(posts);
      res.json({userId: userId })
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  });

  router.post('/', async (req, res) => {
    const { userId } = req.params;
    const { title, content } = req.body;
    try {
      //const newPost = await Project.create({ title, content, userId });
      res.json(newPost);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create post' });
    }
  });  

module.exports =   router;