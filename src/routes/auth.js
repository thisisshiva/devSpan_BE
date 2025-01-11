const express = require("express");
const User = require("../model/user");
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const { signupValidation } = require("../utils/validation");
const jwt = require('jsonwebtoken')

authRouter.post("/signup", async (req, res) => {
  try {
    //validation of data
    signupValidation(req);

    //desturcturing req.body obj
    const { firstName, lastName, password, email } = req.body;

    //password encryption
    const passwordHash = await bcrypt.hash(password, 10); //10 is salting

    //Creating New instance of the user model
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await user.save();
    res.send("Data added successfully in db");
  } catch (err) {
    res.status(400).send("err occured while saving the data:" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Crediential");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {

      // create JWT token
      const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$786", {expiresIn: '7h'}); //hiding id info and giving secreteKey

      //add token to the cookie and send back to the user
      res.cookie("token", token);
      res.send("Login Successful");
    } else {
      throw new Error("Invalid Crediential");
    }
  } catch (err) {
    res.status(400).send("Error while login: " + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
    res.cookie("token", null, {expires: new Date()})
    res.status(200).send('Logged out successfully');
});

module.exports = authRouter;
