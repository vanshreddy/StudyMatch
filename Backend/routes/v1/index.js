const express = require('express');
const usersRoute = require('./users.route');



const router = express.Router();

const defaultRoutes = [
  {
    path: '/users',
    route: usersRoute,
  },
];


defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });


module.exports = router;