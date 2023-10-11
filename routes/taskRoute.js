const express = require('express');
const { GetNotesController, AddNotesController, DeleteNotesController, UpdateNotesController } = require('../Controllers/taskController')

const taskRoute = express.Router();

taskRoute.get('/getallNotes', GetNotesController)
taskRoute.post('/createNotes', AddNotesController)
taskRoute.delete('/deleteNotes/:id', DeleteNotesController)
taskRoute.put('/updateNotes/:id', UpdateNotesController)

module.exports = taskRoute;