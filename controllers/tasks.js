const Task = require('../models/Task')
const mongoose = require('mongoose')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')
const getAllTasks = asyncWrapper(async(req,res) => {
  
    const tasks = await Task.find({})
    res.status(200).json({tasks})
    
  
})
const getTask = asyncWrapper(async(req,res,next) => {
  
    const task= await Task.findOne({_id: req.params.id})
    if(!task){
      const error = new Error('Not Found!')
      error.status = 404
      return next(error)
      return res.status(404).json({msg: `no task with id : ${taskID}`})
    }
    res.status(200).json({task})
  
})
const createTask = asyncWrapper(async(req,res) => {
  
    const task = await Task.create(req.body)
    res.json({task})
  
})
const deleteTask = asyncWrapper(async(req,res) => {
  
    const {id: taskID} = req.params
    const task = await Task.findOneAndDelete({_id: taskID})
    if(!task){
      res.status(404).json({msg: `no task with id ${taskID}`})
    }
    res.status(200).json({task})
  
})
const updateTask = async(req,res) => {
  
    const {id: taskID} = req.params
    const task = await Task.findOneAndUpdate({_id: taskID},req.body)
    if(!task){
      res.status(404).json({msg: `no task with id ${taskID}`})
    }
    res.status(200).json({before:task,updated:req.body})
  
}
module.exports = {getAllTasks,getTask,createTask,deleteTask,updateTask}