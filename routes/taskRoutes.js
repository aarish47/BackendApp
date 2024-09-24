const express = require("express");
const router = express.Router();
const {protect} = require("../middlewares/authMiddlewares")

const { getTasks, setTasks, updateTasks, deleteTasks } = require("../controllers/taskControllers");

router.get("/", protect, getTasks)
router.post("/", protect, setTasks)
router.put("/:id", protect, updateTasks)
router.delete("/:id", protect, deleteTasks)

module.exports = router