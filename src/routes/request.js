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

    const toUserExistInDb = await User.findById(toUserId)
    if(!toUserExistInDb){
      return res.status(400).send({message: 'User is not found'})
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

    const connectionReq = new ConnectionReq({
      fromUserId,
      toUserId,
      status
    })
    const data = await connectionReq.save();  //save into the db

   
    res.json({
      message: `${req.user.firstName} is ${status} in ${toUserExistInDb.firstName}`,
      data,
    })
  }
  catch(err){
    res.status(400).send('Erro: '+ err.message) 
  }  
})



requestRouter.post('/request/review/:status/:requestId',userAuth, async (req,res) => {

  try{
    
    const loggedInUser = req.user;

    const status = req.params.status
    const requestId = req.params.requestId

    const allowedStatus = ['accepted','rejected'];
    if(!allowedStatus.includes(status)){
      return res.status(400).json({message:'Invalid status code'})
    }

    const connectionReq = await ConnectionReq.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: 'interested',
    })
    if(!connectionReq){
      return res.send(400).json({
        message: 'connection request not found',
      })
    }

    connectionReq.status = status;

    const data = await connectionReq.save();

    res.status(400).json({
      message: 'connetion request '+ status,
      data
    })
    
  }
  catch(err){
    res.status(400).send('Error: ' + err.message)
  }

})


module.exports = requestRouter;
