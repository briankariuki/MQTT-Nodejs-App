const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const config = require("./config/config");
const path = require("path");

//Initiate Express App
const app = express();

app.use(morgan("combined")); //Provides more logging information in the console
app.use(express.json()); //Initialize express middleware to parse incoming request bodies
app.use(cors()); //Allow cross-origin requests

//Initialize and connect to  MongoDB Atlas Cloud Service using Mongoose
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;

//Console log when connection is active
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//Express Routes
const register = require("./routes/register");
const login = require("./routes/login");
const user = require("./routes/user");
const mqttRoute = require("./routes/mqttRoute");

//functions to be exectuted when a Route is activated
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/user", user);
app.use("/api/mqtt", mqttRoute);

//serve static assets

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/public"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "/public/index.html"));
  });
}

//start server and listen on localhost:8085
app.listen(config.port, () => {
  console.log(`server started on port ${config.port}`);
});
