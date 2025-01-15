const express = require("express");
const dbConnect = require("./config/databaseUtil");
const cookie_parser = require('cookie-parser')

//Local imports
const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')
const requestRouter = require('./routes/request');
const userRouter = require("./routes/user");

const app = express();

app.use(express.json());
app.use(cookie_parser())

app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)
app.use("/",userRouter)

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
