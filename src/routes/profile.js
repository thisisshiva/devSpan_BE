const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const {profileEditValidation} = require('../utils/validation')

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const findingUser = req.user;
    if (!findingUser) {
      throw new Error("User does not Exists");
    }
    res.send(findingUser);
  } catch (err) {
    res.status(400).send("Error" + err.message);
  }
});

profileRouter.patch('/profile/edit', userAuth ,async (req,res) => {
    try{
        if(!profileEditValidation(req)){
            throw new Error("Invalid Edit request")
        }

        const loggedInUser = req.user

        Object.keys(req.body).forEach((keys)=>(loggedInUser[keys]=req.body[keys]));
        await loggedInUser.save();

        res.json({message:`${loggedInUser.firstName} you have successfully edited`,data: loggedInUser})
    }
    catch(error){
        res.send('ERROR :'+ error.message)
    }
})

module.exports = profileRouter;
