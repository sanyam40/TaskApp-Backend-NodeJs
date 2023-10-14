const express = require('express');
const { GetNotesController, AddNotesController, DeleteNotesController, UpdateNotesController } = require('../Controllers/taskController')
const verifyToken=require('../MiddleWare/jwt');

const taskRoute = express.Router();

taskRoute.get('/getallNotes',verifyToken, GetNotesController)
taskRoute.post('/createNotes',verifyToken, AddNotesController)
taskRoute.delete('/deleteNotes/:id',verifyToken, DeleteNotesController)
taskRoute.put('/updateNotes/:id',verifyToken, UpdateNotesController)

module.exports = taskRoute;