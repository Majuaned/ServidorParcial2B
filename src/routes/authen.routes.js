const routes = require('express').Router();
const {login} = require('../controllers/authen.controllers');

routes.post('/login',login);

module.exports = routes;



