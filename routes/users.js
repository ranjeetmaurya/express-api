const express = require('express');
const router = express.Router();
const { User } = require('./../app//models');

router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id
      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ });
      res.status(200).json(user);
    } catch(error) {
      res.status(500).json({ message: "Something went wrong" });
    };
});

const projectsRoutes = require('./projects');
router.use('/:userId/projects', projectsRoutes);

module.exports = router;