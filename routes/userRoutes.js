const express = require("express");
const router = express.Router();
const {protect} = require("../middlewares/authMiddlewares")

const {registerUser, loginUser, getCurrentUser} = require("../controllers/userControllers")

router.post("/", registerUser)
router.post("/login", loginUser)
router.get("/current", protect, getCurrentUser)

module.exports = router