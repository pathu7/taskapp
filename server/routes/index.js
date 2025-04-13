const express = require("express");
const { signup, login, user } = require("../controller/user");
const { task, addtask, deletetask, statusTask } = require("../controller/task");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/user", user);
router.get("/task", task);
router.post("/task", addtask);
router.delete("/task/:id", deletetask);
router.post("/taskstatus", statusTask);

module.exports = router;
