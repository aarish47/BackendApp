const {getTasks, setTasks} = require("../controllers/taskControllers")
const Task = require("../models/taskModels")

jest.mock("../models/taskModels")

test("get tasks for the user", async () => {
    const req = {user: {id: 'user-id'}}

    const tasks = [
        {_id: "task-id-1", text:"Task 1", user: "user-id"},
        {_id: "task-id-2", text:"Task 2", user: "user-id"}
    ]

    Task.find.mockResolvedValue(tasks)

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    }

    await getTasks(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(tasks)
})

test("set tasks for the user", async () => {
    const req = {user: {id: "user-id"}, body: {text: "New Task"}}
    const task =  {_id: "new-task-id", text: "New Task", user: "user-id"}

    Task.create.mockResolvedValue(task);

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    }

    await setTasks(req, res)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(task)
})