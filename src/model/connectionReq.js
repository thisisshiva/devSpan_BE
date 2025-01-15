const mongoose = require('mongoose')

const connectionReqSchema = new mongoose.Schema({

    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status:{
        type: String,
        enum: {         //enum defines what values are acepted
            values:['ignored','interested','accepted','rejected'],
            message: `{VALUE} is incorrect status type`,
        }
    },
},
{
    timestamps: true,
})

connectionReqSchema.pre('save',function(next){
    connectionRequest = this
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error('cannot send request to yourself')
    }
    next()
});

const ConnectionReqModel = mongoose.model("ConnectionRequest",connectionReqSchema);

module.exports = ConnectionReqModel;
