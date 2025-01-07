const mongoose = require('mongoose')

const dbConnect = async ()=>{
    await mongoose.connect("mongodb+srv://thisisshiva:rootshiva@cluster0.ymgfk.mongodb.net/devTinder")
}

module.exports= dbConnect