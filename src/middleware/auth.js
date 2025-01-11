const User = require("../model/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    //The Job of user Auth is
    //Read the token form the req cookies
    const { token } = req.cookies;
    if(!token){
        throw new Error('Token is expired!!!!!!')
    }
    const { _id } = await jwt.verify(token, "DEV@Tinder$786"); //decoding

    //Validate the user
    const user = await User.findOne({ _id });
    if (!user) {
      throw new Error("User is not valid");
    }
    req.user = user;
    next();

  } catch (err) {
    res.status(400).send("Authentication failed");
  }
};

module.exports = { userAuth };
