const jwt = require("jsonwebtoken");
const config = require("../src/config/config");

module.exports = {
  //Middleware that checks to see if any token has been provided. This protects  private endpoints
  //If no token provided return status 401 error: Unauthorized
  auth(req, res, next) {
    //Get token from request header
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).send({
        message: "No Token. Access Denied"
      });
    }
    try {
      //Use jwt verify() method to check authenticity of the token and if it is valid
      const verifiedToken = jwt.verify(token, config.authentication.jwtSecret);
      req.user = verifiedToken;

      //If valid, call next() method
      next();
    } catch (err) {
      //If invalid token return error
      res.status(400).send({
        message: "Token is invalid"
      });
    }
  }
};
