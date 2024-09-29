const express = require('express');
const router = express.Router({ mergeParams: true });
const { User, Project } = require('./../app//models');

router.get('/', async (req, res) => {
    const { userId } = req.params;
    const user = await User.findOne({
      where: {
        id: userId
      },
      include: Project
    });
    const projects = await user.getProjects();
    try {
      res.json(projects || [])
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  });

router.post('/', async (req, res) => {
  const { userId } = req.params;
  const { title, description, c_date } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({
      where: {
        id: userId
      }
    });
    const project = await user.createProject({ title
      , description, c_date
    });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error:  "Failed to create project" });
  }
});  

router.get('/:projectId', async (req, res) => {
  const { userId, projectId } = req.params;
  try {
    const user = await User.findOne({ where: { id: userId }})
    const project = await user.getProjects({ where: { id: projectId}});
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get post' });
  }
});

const tasksRoutes = require('./taskRoutes');
router.use("/:projectId/tasks", tasksRoutes);

module.exports =   router;