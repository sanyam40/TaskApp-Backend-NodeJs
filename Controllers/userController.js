const userModel = require('../Model/userModel');
const encryptanddecrypt = require('../utils/bcrypt');

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email: email });

        if (!user) {
            res.status(404).json({ message: "User not registered" });
            return;
        }

        const isPasswordValid = encryptanddecrypt.matchPwd(password, user.password);
        if (isPasswordValid) {
            res.status(200).json({ message: "Login successful"});
        } else {
            res.status(403).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal error" });
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
            res.status(201).json({ message: "User registered successfully" });
        } else {
            res.status(500).json({ message: "Failed to register user" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { loginController, registerController };
