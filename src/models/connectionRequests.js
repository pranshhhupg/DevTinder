const mongoose = require('mongoose');

const connectionRequest= new mongoose.Schema({
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    status : {
        type : String,
        enum : {
            values: ["ignored","accepted","interested","rejected"],
            message :  `{VALUE} is not accepted status type`
        } 
    }
},
{
    timestamps : true
});

connectionRequest.pre("save", function (){

    if(this.fromUserId.equals(this.toUserId)){
        throw new Error("Can't send connection request to yourself");
    }

})

module.exports = mongoose.model("connectionRequest",connectionRequest);