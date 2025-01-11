const express = require("express");
const requrestRouter = express.Router();
const {userAuth} = require('../middleware/auth')

requrestRouter.post("/sendConnectionRequest", userAuth, (req, res) => {
  const user = req.user;
  res.send(user.firstName + " Sent you a request ");
});

module.exports = requrestRouter;
