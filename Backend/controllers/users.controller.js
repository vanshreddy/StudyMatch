// const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');



const createUser = catchAsync(async (req, res) => {
    res.status(200).send({ message: 'User created' })
});


module.exports = {
    createUser,
  };