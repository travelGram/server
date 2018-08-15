var express = require("express");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var cors = require("cors");
require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(`mongodb://${process.env.MLAB_USER}:${process.env.MLAB_PASS}@ds121382.mlab.com:21382/travel-gram`,{ useNewUrlParser: true });

let indexRoutes = require("./routes/index");
let usersRoutes = require("./routes/users");
let postsRoutes = require("./routes/posts");

let app = express();

app.use(cors())

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", indexRoutes);
app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

/// error handlers

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {});

module.exports = app;
