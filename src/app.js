const express = require("express");
const dbConnect = require("./config/databaseUtil");
const User = require("./model/user");

const app = express();

app.use(express.json());

//save new User Obj API
app.post('/signup',async (req,res) => {
    //Creating New instance of the user model --OR-- in simple term creating a new User for the user_data
    const user = new User(req.body)
    
    try{
        const savedUser= await user.save();
        res.send("Data added successfully in db")
        console.log(savedUser); 
    }
    catch(err){
        res.status(400).send('err occured while saving the data:'+err)
    }
})

//finding user by emailId Obj API
app.get('/user', async (req,res) => {

  try{
    const user = await User.findOne({email : req.body.email}); 
    if(!user){
      res.status(400).send('Something went wrong')
    }
    else{
      res.send(user);
    }
  }
  catch(err){
    res.status(400).send('Something went wrong')
  }
})

//get all the user API
app.get('/feed', async(req,res)=>{
  // const allUser = req.body.email
  try{
    const allUser = await User.find({})
    if(!allUser){
      res.status(400).send('Something went wrong')
    }
    else{
      res.send(allUser);
      console.log(allUser);
      
    }
  }
  catch(err){
    res.status(400).send('Something went wrong')
  }
})

//delete user by Id Obj API
app.delete('/deleteuser', async (req,res) => {

  const userId = req.body.userId

  try{
    const delUser = await User.findByIdAndDelete(userId)
    res.send(delUser)
    console.log(delUser);
    
  }
  catch(err){
    console.log(err);
    res.status(400).send('something went wrong')
  }
})

//Update user by Id Obj API Using patch /patch update partially to update only required data not entire resourse 
app.patch('/updateuser', async(req,res) => {

  const userId = req.body.userId;
  const data = req.body 

  try{
    const updatedUser = await User.findByIdAndUpdate({_id: userId},data)
    if(!updatedUser){
      res.status(400).send('err occured while updating user')
    }
    else{
      res.send(updatedUser)
      console.log(updatedUser);
    }

  }
  catch(err){
    console.log(err);
    res.status(400).send('something went wrong')
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
