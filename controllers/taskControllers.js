const asyncHandler = require("express-async-handler")
const Task = require("../models/taskModels")

const {protect} = require("../middlewares/authMiddlewares")
const User = require("../models/userModels")

const getTasks = asyncHandler(async (request, response) => {
    const tasks = await Task.find({user: request.user.id})
    response.status(200).json(tasks)
})

const setTasks = asyncHandler(async (request, response) => {
    const task = await Task.create({text: request.body.text, user: request.user.id})
    response.status(200).json(task)
})

const updateTasks = asyncHandler(async (request, response) => {
    const task = await Task.findById(request.params.id)

    if (!task) {
        response.status(400)
        throw new Error("Task was not Found")
    }

    const user = await User.findById(request.user.id)
    if (!user) {
        response.status(401)
        throw new Error("User not Found")
    }

    if (task.user.toString() !== user.id) {
        response.status(401)
        throw new Error("User is not Authorized to Update")
    }

    const updatedTask = await Task.findByIdAndUpdate(request.params.id, request.body, { new: true })
    response.status(200).json(updatedTask)
})

const deleteTasks = asyncHandler(async (request, response) => {
    const task = await Task.findById(request.params.id)

    if (!task) {
        response.status(400)
        throw new Error("Task was not Found")
    }

    const user = await User.findbyId(request.user.id)

    if (!user) {
        response.status(401)
        throw new Error("User not Found")
    }

    if (task.user.toString !== user.id) {
        response.status(401)
        throw new Error("User is not Authorized to Delete")
    }

    await Task.findByIdAndDelete(request.params.id)
    response.status(200).json({ id: request.params.id })
})
    
module.exports = {getTasks, setTasks, updateTasks, deleteTasks}