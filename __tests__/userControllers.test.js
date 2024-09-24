const { registerUser } = require("../controllers/userControllers"); // Ensure the correct export
const bcrypt = require("bcryptjs");

jest.mock("../models/userModels.js", () => {
    const mockUser = {
        _id: "user-id",
        name: "AarishAsifKhan",
        email: "AarishAsifKhan@gmail.com"
    };

    return {
        findOne: jest.fn().mockResolvedValue(null), // Mock findOne for checking if user exists
        create: jest.fn().mockResolvedValue(mockUser) // Mock create for new user
    };
});

jest.mock("jsonwebtoken", () => ({
    sign: jest.fn().mockReturnValue("mock-token")
}));

bcrypt.genSalt = jest.fn().mockResolvedValue("mock-salt");
bcrypt.hash = jest.fn().mockResolvedValue("mock-hashed-password");

test("register a user", async () => {
    const req = {
        body: {
            name: "AarishAsifKhan",
            email: "AarishAsifKhan@gmail.com",
            password: "AarishAsifKhan"
        }
    };

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };

    await registerUser(req, res);
    expect(res.status).toHaveBeenCalledWith(201); // Ensure that the response status is 201
});

test("give 404 error if field is not given", async () => {
    const req = {
        body: {
            name: "AarishAsifKhan",
            email: "",
            password: "AarishAsifKhan"
        }
    }

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    }
    
    await expect(registerUser(req, res)).rejects.toThrow("All fields are Mandatory")
    expect(res.status).toHaveBeenCalledWith(400)
})