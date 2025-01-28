const User = require("../model/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    //The Job of user Auth is
    //Read the token form the req cookies
    const { token } = req.cookies;
    if(!token){
        return res.status(401).send('Please Login')
    }
    const { _id } = await jwt.verify(token, process.env.SECRETEKEY); //decoding

    //Validate the user
    const user = await User.findOne({_id});
    if (!user) {
      throw new Error("User is not valid");
    }
    req.user = user;
    next();

  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
};

module.exports = { userAuth };
