const express = require("express");
const userRouter = express.Router();

const { index, create } = require("../controller/UserController")

userRouter.get("/list", index)
userRouter.post("/create", create)

module.exports = userRouter;

// CRUD
// app.get('user', "controller")