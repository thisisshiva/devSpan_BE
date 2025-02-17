const  express = require('express');
const { userAuth } = require('../middleware/auth');
const ConnectionReqModel = require('../model/connectionReq');
const userRouter = express.Router();
const User = require('../model/user')

// show all the pending connection request for the loggedin user 
userRouter.get('/user/requests/received', userAuth, async (req,res,) => {

    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionReqModel.find({
            toUserId: loggedInUser._id,     //who all send connection req to me so i need to be logged in 
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
                {fromUserId: loggedinUser._id , status: 'accepted' },
                {toUserId: loggedinUser._id , status: 'accepted' }
            ]
        }).populate('fromUserId', 'firstName lastName photoUrl skills about').populate('toUserId', 'firstName lastName photoUrl skills about')

        const data = connectionReq.map((row)=> {
            if(row.fromUserId._id.toString()=== loggedinUser._id.toString()){
                return row.toUserId
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

userRouter.get('/feed' , userAuth, async (req,res) => {
    try{
        const loggedInUser = req.user
        const page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 17;
        limit = limit>50 ? 50 : limit; 
        const skip = (page-1) * limit;

        const allConnectionReq = await ConnectionReqModel.find({
            $or: [ {fromUserId: loggedInUser._id}, {toUserId: loggedInUser._id} ]
        }).select('fromUserId toUserId')

        const hideUserFromFeed = new Set()
        allConnectionReq.forEach(req=>{
            hideUserFromFeed.add(req.fromUserId.toString())
            hideUserFromFeed.add(req.toUserId.toString())
        })
        

        const userNeedsToDisplay = await User.find({
            $and: [ 
                { _id: {$nin: Array.from(hideUserFromFeed)} } , 
                { _id: {$ne: loggedInUser._id } }
            ]
        }).select('firstName lastName skills about photoUrl').skip(skip).limit(limit)

        res.json({data: userNeedsToDisplay})
    }
    catch(err){
        res.status(400).send('Error: '+ err.message);
    }
})

module.exports = userRouter;