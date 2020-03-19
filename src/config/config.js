//All configs and PRIVATE_KEYS go here
const path = require("path");
module.exports = {
  port: process.env.PORT || 8085,
  mongoURI:
    "mongodb+srv://briankariuki:brian123456@cluster0-8w3lh.mongodb.net/client?retryWrites=true&w=majority",
  authentication: {
    jwtSecret: process.env.JWT_SECRET || "awesomeApp"
  }
};
