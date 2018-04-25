
'use strict'
const express = require('express');
var mqtt = require('mqtt')
var app = express();
const bodyParser = require('body-parser');


var pointer;

var hhost;
var user;
var pass;
var pport;
var topic;
var msg;


//app.set('port', (process.env.PORT || 5000))
var port = process.env.PORT || pport;
//app.use(express.static('webroot'))
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())



app.get('/', function (req, res) {

	res.send("MQTT")
})




app.get('/mqtt', function (req, res) {
  
pointer = req.query.pointer;
hhost = req.query.hhost;
user = req.query.user;
pass = req.query.pass;
pport = req.query.pport;
topic = req.query.topic;
msg = req.query.msg;


var options = {
  port: pport,
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  username: user,
  password: pass,
};
 
 
var client  = mqtt.connect('mqtt://'+hhost+'.cloudmqtt.com', options)
 
   client.on('connect', function() { // When connected


/* 
  // subscribe to a topic
  client.subscribe('/app', function() {
    // when a message arrives, do something with it
    client.on('message', function(topic, message, packet) {
      console.log("Received '" + message + "' on '" + topic + "'");
    });
  });
*/

  // publish a message to a topic
  client.publish(topic, msg, function() {
    console.log("topic" + topic + ":" +"Message" + msg);
    //client.end(); // Close the connection when published
  });
});


res.send("Success   : "+ topic + "/" +msg)

});




/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////







app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});

