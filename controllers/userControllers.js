const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModels");

const registerUser = asyncHandler(async (request, response) => {
    const { name, email, password } = request.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
        response.status(400);
        throw new Error("All fields are Mandatory");
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        response.status(400);
        throw new Error("User already exists");
    }

    // Hash the password before saving the user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user in the database
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    // Check if the user was created and send a response
    if (user) {
        response.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateJWTtoken(user._id) 
        });
    } else {
        response.status(400);
        throw new Error("Invalid user data");
    }
});

const loginUser = asyncHandler(async (request, response) => {
    const {email, password} = request.body
    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))) {
        response.json({ _id: user.id, name: user.name, email: user.email, token: generateJWTtoken(user._id)})
    } else {
        response.status(400)
        throw new Error("Invalid Data")}
});

const getCurrentUser = asyncHandler(async (request, response) => {
    const {_id, name, email} = await User.findById(request.user.id)
    response.status(200).json({id: _id, name, email})
});

const generateJWTtoken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "5d" })

module.exports = { registerUser, loginUser, getCurrentUser };
