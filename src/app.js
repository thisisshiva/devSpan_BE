const express = require("express");
const dbConnect = require("./config/databaseUtil");
const cookie_parser = require("cookie-parser");
require('dotenv').config()

const cors = require("cors");

//Local imports
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

const app = express();

app.use(
  cors({
    origin: ["https://devspan-frontend-7pqf.onrender.com","http://localhost:5173"],
    credentials: true
  })
);

app.use(express.json());
app.use(cookie_parser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

dbConnect()
  .then(() => {
    console.log("connection established successful:");
    const PORT = process.env.PORT;
    app.listen(PORT,() => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("some err occured while connection:", err);
  });
