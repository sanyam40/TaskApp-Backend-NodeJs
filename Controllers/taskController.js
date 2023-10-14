const taskModel = require('../Model/taskModel')
const { default: mongoose } = require('mongoose');
const { v4 } = require('uuid');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

const GetNotesController = async (req, res) => {
    try {
        const notes = await taskModel.find();
        if (!notes) {
            res.status(404).json({ message: "Notes not found" });
            return;
        }
        else {
            jwt.verify(req.token, secretKey, (err, authData) => {
                if (err) {
                    res.status(403).json({ message: "Forbidden: Invalid Token" });
                } else {
                    res.status(200).json({Notes : notes});
                }
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal error" });
    }
};

const AddNotesController = async (request, response) => {
    const { title, desc, useremail } = request.body;
    console.log(request.body);

    try {
        const uuid = v4();
        const dateOfCreation = new Date();
        const taskResponse = await taskModel.create({
            taskId: uuid,
            title: title,
            desc: desc,
            dateOfCreation: dateOfCreation,
            useremail: useremail
        });

        if (taskResponse && taskResponse._id) {
            response.status(201).json({ message: "Task created successfully", data: taskResponse });
        }
        else {
            response.status(404).json({ message: "user not created" });
        }
    }
    catch (error) {
        console.log("error creating user", error);
        response.status(500).json({ message: "Internal server error" });
    }
};

const DeleteNotesController = async (req, res) => {
    const taskId = req.params.id; // Assuming you pass the task ID in the URL parameter

    try {
        const task = await taskModel.findByIdAndDelete(new mongoose.Types.ObjectId(taskId));
        if (!task) {
            res.status(404).json({ message: "Task not found" });
            return;
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal error" });
    }
};

const UpdateNotesController = async (req, res) => {
    const taskId = req.params.id; // Assuming you pass the task ID in the URL parameter
    const { title, desc, dateOfCreation, username } = req.body;
    try {
        const updatedTask = await taskModel.findByIdAndUpdate(
            taskId,
            {
                title: title,
                desc: desc,
                dateOfCreation: dateOfCreation,
                username: username
            },
            { new: true } // Return the updated task
        );
        if (!updatedTask) {
            res.status(404).json({ message: "Task not found" });
            return;
        }
        res.status(200).json({ message: "Task updated successfully", data: updatedTask });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal error" });
    }
};

module.exports = { GetNotesController, AddNotesController, DeleteNotesController, UpdateNotesController };