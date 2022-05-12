const express = require("express");
const router = express.Router();

const userRouter = require("./UserRoute")

router.use("/api/user", userRouter);

module.exports = router
