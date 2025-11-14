const  express=require('express');
const { loginUser, registerUser } = require('../../controllers/auth/auth.controller');

const route=express.Router();

route.post('/register',registerUser);
route.post('/login',loginUser)

module.exports = route;