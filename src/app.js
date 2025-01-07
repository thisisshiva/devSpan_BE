const express = require('express');

const app = express();


app.use("/host", (req, res) => {
    console.log(req.url, req.method);
    res.send('this is the host dashboard');
});

app.use("/user", (req, res) => {
    console.log(req.url, req.method);
    res.send('this is the user dashboard');
});

app.use("/", (req, res,next) => {
    console.log(req.url, req.method);
    res.send('this is the tinder msg');
});

const PORT = 7000;
app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
});
