const path = require('path');
const express = require('express');
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mysql = require('mysql');
const app = express();

var student = require("./routes/student");

var router = express.Router();

// connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/employees",{useNewUrlParser: true,useFindAndModify: false, })
.then(() => console.log("connection successful"))
.catch((err) => console.error(err));
// end
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.engine(
  "hbs", exphbs({
    extname: "hbs",
    defaultLayout: "mainLayout",
    layoutsDir: __dirname + "/views/layouts",
  })
);
app.set("view engine", "hbs");

app.use("/", student);




app.listen(5000,()=>{
console.log("server start port number 5000");
});

