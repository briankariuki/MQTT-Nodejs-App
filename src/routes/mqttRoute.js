const express = require("express");
const router = express.Router();
const fs = require("fs");
const mqtt = require("mqtt");
const url = require("url");
const Hello = require("../models/Hello");
const { auth } = require("../../middleware/authorization");
const mqtt_url = "mqtt://broker.mqttdashboard.com";
const topic = "HelloServer";
const clientId = "MyWebMQTTTest";

//Initiate MQTT conncetion to the Broker. In this case the open source HiveMQTT broker
const client = mqtt.connect(mqtt_url, {
  clientId: clientId
});

//console log if connection is succesful
console.log("Broker Connected Successfully to " + mqtt_url);

//Create a local directory on the server to store our messages
const dir = "./folderID_" + clientId;

//Check if directory exists, if it does not exist, create it
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// @route GET api/mqtt/messages
// @desc GET  messages from a user with the query userID
// @access Private
router.get("/messages", auth, function(req, res) {
  const { id } = req.user;
  Hello.find(
    {
      userID: id
    },
    {
      userID: "1",
      File: "1",
      Time: "1"
    }
  )
    .sort({ Time: -1 })

    .then(messages => {
      res.send(messages);
    });
});

// @route DELETE api/mqtt/messages:id
// @desc Delete a message
// @access Private
router.delete("/messages/:id", auth, function(req, res) {
  Hello.findById(req.params.id).then(hello =>
    hello.remove().then(() => res.send({ success: "True" }))
  );
});

client.on("connect", function() {
  // @route POST api/mqtt
  // @desc Publish a message using MQTT and then save it in MongoDB and Local Folder
  // @access Private
  router.post("/", auth, function(req, res) {
    //Initiate MQTT Broker by connecting to it
    const client = mqtt.connect(mqtt_url, {
      clientId: clientId
    });

    //Get payload data
    const { message, topic, userId } = req.body;

    //validate if there is message is defined. If not return error
    if (!message) {
      return res.status(400).send({
        error: "Message undefined"
      });
    }

    //covert message to a string object
    const msg = JSON.stringify({
      date: new Date(),
      message: message,
      clientId: clientId,
      userId: userId
    });

    //Log when the MQTT client receives a packet
    client.on("packetreceive", function(packet) {
      const { cmd } = packet;
      console.log("received action " + cmd);
    });

    //Log when the MQTT client receives a packet
    client.on("packetsend", function(packet) {
      const { cmd } = packet;
      console.log("sent action " + cmd);
    });

    //Subscribe to topic HelloServer
    client.subscribe(topic, function() {
      //Listen for on receive message event
      client.on("message", function(topic, msg, pkt) {
        //Get Message Id from the MQTT Client and console log it
        const messageId = client.getLastMessageId();
        console.log("Message " + messageId + " Succesfully Received");
        console.log(topic, messageId, msg.toString());

        //Parse recieved message to JSON object
        const receivedMessage = JSON.parse(msg.toString());

        //Assign FileName to File for saving
        const FileName = "Message with id_" + messageId + " on topic " + topic;

        //create a new message object by passing in the various param, and initiate with the Hello Mongoose Model
        const message = new Hello({
          clientID: receivedMessage.clientId,
          userID: receivedMessage.userId,
          FileName: FileName,
          File: receivedMessage.message,
          Time: receivedMessage.date
        });

        //Save Message to Hello MongoDB Collection
        message.save().then(message => {
          //Disconnect MQTT Client
          client.end();

          //Save Message to folder

          const { FileName } = message;

          //Convert received message object to a string
          const jsonContent = JSON.stringify(message);

          //Use fs module to write a file in the folder_MyWebMQTTTest and name the file {FileName}
          fs.writeFile(`${dir}/${FileName}.json`, jsonContent, "utf8", function(
            err
          ) {
            //Check for errors and log them into the console
            if (err) {
              console.log(
                "An error occured while writing Message to  Directory"
              );
              return console.log(err);
            }
            console.log("File " + FileName + " has been successfully saved.");
          });

          // If sucessfull send message to client that operation has succeeded
          // Send also a payload with the saved message as JSON
          console.log(message);
          res.status(200).send({
            _id: message._id,
            userID: message.userID,
            File: message.File,
            Time: message.Time
          });
        });
      });
    });

    // Publish any received messages under topic HelloServer and console log it
    client.publish(topic, msg, function() {
      const messageId = client.getLastMessageId();
      console.log("Message " + messageId + " Succesfully Published");
    });
  });
});

module.exports = router;
