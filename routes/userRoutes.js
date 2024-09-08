const express = require('express');
const router = express.Router();
const userController = require('./../app/controllers/userController');

router.get('/:id', userController.getUserById);



const projectsRoutes = require('./projects');
router.use('/:userId/projects', projectsRoutes);

module.exports = router;