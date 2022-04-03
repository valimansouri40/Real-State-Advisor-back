const { default: mongoose } = require("mongoose");



const RequestSchema=mongoose.Schema({

    Objid:{
        type: mongoose.Schema.ObjectId,
        ref:'Authhh'
    },
    Text:{
        type:String,
        max: [800, 'error text length']
    },
    Job:{
        type:String,
    },
    Type:{
        type:String,
        required:[true, 'error type']
    },
    TypeWork:{
        type:String,
    },
    Price:{
        type: String
    },
    Area:{
        type:String
    },
    City:{
        type:String
    },
    TypeState:{
        type:String
    },
    Cooperation:{
        type:Boolean,
        default:false
    },
    Land:{
        type:Boolean,
        default:false
    },
    Status:{
        type:String,
        default: 'unseen',
        enum:['unseen', 'Pending','Accepted']
    },
    createAt:{
        type:Date,
        default: Date.now()
    }

})


const Request= mongoose.model('request',  RequestSchema);

module.exports= Request;