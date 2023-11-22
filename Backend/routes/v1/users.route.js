const express = require('express');
const usersController = require('../../controllers/users.controller');


const router = express.Router();



router
  .route('/')
  .get(usersController.createUser);


module.exports = router;