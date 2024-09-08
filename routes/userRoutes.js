const express = require('express');
const router = express.Router();
const userController = require('./../app/controllers/userController');

router.get('/:id', userController.getUserById);
router.post('/', userController.createUser)

const projectsRoutes = require('./projectRoutes');
router.use('/:userId/projects', projectsRoutes);

module.exports = router;