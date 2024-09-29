const express = require('express');
const router = express.Router({ mergeParams: true });
const { User } = require('./../app//models');


router.get( '/', async (req, res) => {

});

router.get('/:taskId', async (req, res) => {

});

module.exports = router;