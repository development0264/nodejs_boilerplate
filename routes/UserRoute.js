const express = require("express");
const userRouter = express.Router();

const { getAll, create, deleteUser, updateUser } = require("../controller/UserController")

userRouter.get("/", getAll)
userRouter.post("/", create)
userRouter.delete("/:id", deleteUser)
userRouter.patch("/:id", updateUser)

module.exports = userRouter;