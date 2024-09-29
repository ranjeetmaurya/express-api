const express = require('express');
const router = express.Router();
const userController = require('./../app/controllers/userController');
const authenticateToken = require('../app/helpers/authHelper');

router.use((req, res, next) => {
    // Skip authentication for specific routes like '/login' and '/public'
    if (req.path === '/' || req.path == 'authenticate') {
      return next(); // Skip authentication for these routes
    }
  
    // Apply authentication middleware for all other routes
    authenticateToken(req, res, next);
  });

router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.post('/authenticate', userController.authenticate)
const projectsRoutes = require('./projectRoutes');
router.use('/:userId/projects', projectsRoutes);

  
module.exports = router;