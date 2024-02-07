const express =require('express');
const { createTask, delteTask, getAll, getAllTasks, getSpecificTask, updateTask } =require ('../controllers/tasksController.js');
const auth =require ('../middlewares/auth');

// validation middleware
const {taskvalidation} =require('../middlewares/inputValidation.js');

const router=express.Router();

// get all tasks 

router.get('/',getAll);

// following endpoints are for a specific user or logged in  user

router.get('/user', auth, getAllTasks);

router.post('/', auth, taskvalidation, createTask);

router.get('/:id',auth, getSpecificTask);

router.delete('/:id',auth, delteTask);

router.put('/:id',auth,  taskvalidation, updateTask);
 
module.exports= router;