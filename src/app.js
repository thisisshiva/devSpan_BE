const express = require('express');

const app = express();


app.get("/user", (req, res,next) => {
    console.log(req.query);
    res.send({name:'shiva',age: 21});
});

app.get("/host/:userId/:name/:pswd", (req, res,next) => {
    console.log(req.params);
    res.send({name:'shiva',age: 21});
});

// app.post("/host", (req, res) => {
//     console.log(req.url, req.method);
//     res.send('this is the host dashboard, Msg From Host');
// });

// app.get("/user", (req, res) => {
//     console.log(req.url, req.method);
//     res.send('this is the user dashboard');
// });

// app.use("/", (req, res,next) => {
//     console.log(req.url, req.method);
//     res.send('this is the tinder msg');
// });

const PORT = 7000;
app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
});
