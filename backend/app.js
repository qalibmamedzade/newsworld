const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");

const postsRoutes = require("./routes/posts")
const userRoutes = require("./routes/user")

const mongoose = require('mongoose')

const app = express();
mongoose.connect("mongodb+srv://kibernetik542:Arzu-1990@cluster0-g2eht.mongodb.net/mean-stack-db?retryWrites=true&w=majority", {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected Succesfully!')
  })
  .catch(() => {
    console.log('Connected Failed!')
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE,OPTIONS");
  next();
})

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
