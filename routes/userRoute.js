const express = require('express');
const { loginController, registerController,logoutController } = require('../Controllers/userController');

const userRoute = express.Router();

userRoute.post('/register', registerController);
userRoute.post('/login', loginController);
userRoute.post('/logout', logoutController);

module.exports = userRoute;
