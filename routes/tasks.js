const express = require('express')
const router = express.Router()
const {getAllTasks,getTask,createTask,deleteTask,updateTask} = require('../controllers/tasks')

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTask).delete(deleteTask).patch(updateTask)

module.exports = router