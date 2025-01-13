const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require('../middleware/auth');
const ConnectionReq = require("../model/connectionReq");
const User = require("../model/user");


requestRouter.post('/request/send/:status/:toUserId',userAuth,async(req,res) => {

  try{
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ['ignored','interested']
    if(!allowedStatus.includes(status)){
      return res.status(400).json({message:'invalid status type:' + status})
    }

    const existingRequestOrNot = await ConnectionReq.findOne({
      $or: [
        { fromUserId,toUserId },
        { fromUserId:toUserId, toUserId:fromUserId },
      ]
    })
    if(existingRequestOrNot){
      return res.status(400).send({message : 'connection req already exists'})
    }

     const userExistInDb = await User.findById(toUserId)
    if(!userExistInDb){
      return res.status(400).send({message: 'User is not found'})
    }

    const connectionReq = new ConnectionReq({
      fromUserId,
      toUserId,
      status
    })
    const data = await connectionReq.save();  //save into the db

   
    res.json({
      message: `${req.user.firstName} is ${status} in ${userExistInDb.firstName}`,
      data,
    })
  }
  catch(err){
    res.status(400).send('Erro: '+ err.message) 
  }  
})

requestRouter.post("/request/send/ignored", userAuth, (req,res) => {

})

requestRouter.post('/request/review/accepted',userAuth,(req,res) => {

})
requestRouter.post('/request/review/rejected',userAuth,(req,res) => {

})
module.exports = requestRouter;
