const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const {profileEditValidation} = require('../utils/validation')

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const findingUser = req.user;
    if (!findingUser) {
      throw new Error("User does not Exists");
    }
    res.send("cookie fetched" + findingUser);
  } catch (err) {
    res.status(400).send("Error" + err.message);
  }
});

profileRouter.post('/profile/edit', userAuth ,async (req,res) => {
    try{

        if(!profileEditValidation(req)){
            throw new Error('Cannot edit')
        }

        const loggedInUser = req.user

        
        Object.keys(req.body).forEach((keys)=>(loggedInUser[keys]=req.body[keys]));
        await loggedInUser.save();

        res.send(`${loggedInUser.firstName} you have successfully edited`)
    }catch(err){
        res.send('ERROR:'+ err.message)
    }
})

module.exports = profileRouter;
