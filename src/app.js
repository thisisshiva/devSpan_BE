const express = require("express");
const dbConnect = require("./config/databaseUtil");
const User = require("./model/user");

const app = express();

app.post('/signup',async (req,res) => {

    //Creating New instance of the user model --OR-- in simple term creating a new User for the user_data
    const user = new User({
        firstName:'saru',
        lastName:'Natarajan',
        gender:'female',
        email:'saru@gmail.com',
        password:'saru@123'
    })

    try{
        await user.save();
        res.send("Data added successfully in db")
    }
    catch(err){
        res.status(400).send('err occured while saving the data:'+err)
    }

})


dbConnect()
  .then(() => {
    console.log("connection established successful:");
    const PORT = 7000;
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("some err occured while connection:", err);
  });
