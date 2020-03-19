const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const bcrypt = require("bcryptjs");

//function to create a JWT Token
function jwtSignUser(id) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(id, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  });
}

module.exports = {
  //register user endpoint
  async register(req, res) {
    try {
      const { username, email, password } = req.body;

      //Find a user with the matching email address
      const checkUser = await User.findOne({ email });

      //Check if there is a user that already exists, if exists, return error
      if (checkUser) {
        return res.status(400).send({
          error: "User Already Exists"
        });
      }

      //Initiate a new User
      const user = new User({
        username,
        email,
        password
      });

      //Use bcrypt.js to hash the password

      bcrypt.hash(user.password, 10, function(err, hash) {
        //if successful append hash to user password
        user.password = hash;

        //Then save in Users Collection
        user.save().then(user => {
          //console log the user
          console.log(user);

          //map user to a user object , create a token and send as response,
          res.send({
            user: {
              id: user.id,
              name: user.username,
              email: user.email
            },

            token: jwtSignUser({
              id: user.id
            })
          });
        });
      });
    } catch (err) {
      //catch errors
      res.status(400).send({
        error: "An error occured trying to register"
      });
    }
  },

  //Login Endpoint
  async login(req, res) {
    try {
      //Get email and password fromreq.body
      const { email, password } = req.body;

      //Find user by email from the Users collection
      const user = await User.findOne({ email });

      //console log the user
      console.log(user);

      //If user does not exist return an error
      if (!user) {
        return res.status(403).send({
          error: "The login information was incorrect"
        });
      }

      //If user exists, compare user.password with the hashed password in the User
      bcrypt.compare(password, user.password).then(isMatch => {
        //if match fails, send back an error
        if (!isMatch) {
          return res.status(403).send({
            error: "The password information was incorrect"
          });
        }

        //Then map user to a JSON object using Mongoose toJSON()
        const userJSON = user.toJSON();

        //return and send only required user fields
        res.send({
          user: {
            id: userJSON._id,
            name: userJSON.username,
            email: userJSON.email
          },
          token: jwtSignUser({
            id: user.id
          })
        });
      });
    } catch (err) {
      // if err, return error
      res.status(500).send({
        error: "An error has occured when trying to login"
      });
    }
  },

  //get user from token function
  async user(req, res) {
    try {
      //Get id from user object in the request body
      const { id } = req.user;

      //Find user matching the userID
      const user = await User.findById(id).select("-password");

      //Return user
      res.send({
        user: {
          id: user.id,
          name: user.username,
          email: user.email
        }
      });
    } catch (err) {
      //if err return error
      res.status(500).send({
        error: "An error has occured when trying to fetch user"
      });
    }
  }
};
