const userModel = require('../Model/userModel');
const encryptanddecrypt = require('../utils/bcrypt');
const jwt = require('jsonwebtoken');
const {generateResponse}=require('../MiddleWare/response');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email: email });

        if (!user) {
            generateResponse(res, 404, "User not registered");
            return;
        }

        const isPasswordValid = encryptanddecrypt.matchPwd(password, user.password);

        if (isPasswordValid) {
            jwt.sign({ user }, secretKey, { expiresIn: '300s' }, (err, token) => {
                if (err) generateResponse(res, 500, "Internal server error");
                else res.status(200).json({ message: "Login successful", Token: token });
            });
        } else {
            generateResponse(res, 403, "Invalid email or password");
        }
    } catch (error) {
        generateResponse(res, 500, "Internal server error");
    }
};

const registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPwd = encryptanddecrypt.hasPwd(password);

        const user = await userModel.create({
            email: email,
            password: hashedPwd,
            username: username,
        });

        if (user) {
            generateResponse(res, 201, "User registered successfully");
        } else {
            generateResponse(res, 500, "Failed to register user");
        }
    } catch (error) {
        console.error(error);
        generateResponse(res, 500, "Internal server error");
    }
};

const logoutController = async (req, res) => {
    try {
        const token = await new Promise((resolve, reject) => {
            jwt.sign({}, secretKey, { expiresIn: '1s' }, (err, token) => {
                if (err) reject(err);
                resolve(token);
            });
        });
        res.status(200).json({ message: 'Logout successful', Token: token });
    } catch (error) {
        generateResponse(res, 500, "Internal server error");
    }
};

module.exports = { loginController, registerController, logoutController };
