const mongoose = require('mongoose')

const connectDB=()=>{
    // For local DB
    return mongoose.connect(live_url)


    // For cloud DB
    // return mongoose.connect(database)
    
    .then(()=>{
        console.log("Connected Succeessfully")
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports=connectDB

