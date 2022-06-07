const express = require("express");
const userRouter = express.Router();
const verifyJWT = require("../middleware/verifyJWT")

const { getAll, create, deleteUser, updateUser, handleLogin } = require("../controller/UserController")

//Public Routes
userRouter.post("/", create)
userRouter.post("/login", handleLogin)

//Private Routes using JWT
userRouter.use(verifyJWT) // adding verifyJWT Middleware for protecting routes
userRouter.get("/", getAll)
userRouter.delete("/:id", deleteUser)
userRouter.patch("/:id", updateUser)

module.exports = userRouter;