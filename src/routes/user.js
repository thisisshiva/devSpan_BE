const  express = require('express');
const { userAuth } = require('../middleware/auth');
const ConnectionReqModel = require('../model/connectionReq');
const userRouter = express.Router();

// show all the pendin connection request for the loggedin user 
userRouter.get('/user/requests/received', userAuth, async (req,res,) => {

    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionReqModel.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId", "firstName lastName photoUrl about age skills")
        res.json({
            message: 'all the connection requests',
            data: connectionRequest,
        })

    } catch (error) {
        res.status(400).json('Error: ' + error.message);
    }
})

userRouter.get('/user/requests/connections', userAuth, async (req,res)=>{
    try{
        const loggedinUser = req.user

        const connectionReq = await ConnectionReqModel.find({
            $or: [
                {fromUserId: loggedinUser , status: 'accepted' },
                {toUserId: loggedinUser , status: 'accepted' }
            ]
        }).populate('fromUserId', 'firstName lastName photoUrl skills about').populate('toUserId', 'firstName lastName photoUrl skills about')

        const data = connectionReq.map((row)=> {
            if(row.fromUserId._id.toString()=== loggedinUser._id.toString()){
                return toUserId
            }
            return row.fromUserId
        })
        res.json({data});
    }
    catch(err){
        res.status(400).json({
            message: 'Error:',
            data: err.message
        })
    }
})

module.exports = userRouter;