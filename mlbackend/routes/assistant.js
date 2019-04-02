var express = require('express');
var router = express.Router();
var fs = require('fs');
var app = express();
const port = 8000;

console.log(process.cwd());

var list_of_intents = JSON.parse(fs.readFileSync('intents.json', 'utf8'));

console.log("Server Running At: localhost:" + port);

var Client = require('node-rest-client').Client;
var client = new Client();

var io = require('socket.io').listen(app.listen(port));
io.sockets.on("connection",function(socket) {
  console.log('User connected');

  socket.on('clientEvent', function(data) {
    console.log("User prompt: " + data.msg);
    console.log("Chat context: " + data.context)
    console.log("Bot params: " + data.botparams);

    if (!data.context) {
      // out of context

      var args = {
          data: { "sentence": data.msg },
          headers: { "Content-Type": "application/json" }
      };

      client.post("http://127.0.0.1:5001/katana-ml/api/v1.0/assistant", args, function (data, response) {
        if(Buffer.isBuffer(data)) {
          data = JSON.parse(data);
        }

        var intents = list_of_intents.intents;
        var responseMsg;
        var responseContext;
        for (i = 0; i < intents.length; i++) {
          if(intents[i].tag === data[0].intent) {
            var responseId = getRandomInt(0, intents[i].responses.length - 1);
            responseMsg = intents[i].responses[responseId];
            responseContext = intents[i].context[0];
            break;
          }
        }

        console.log("Intent: " + data[0].intent);
        console.log("Probability: " + data[0].probability);
        console.log();

        socket.emit('serverEvent', {intent: data[0].intent, msg: responseMsg, context: responseContext});
      });
    } else {
      // in context

      var intents = list_of_intents.intents;
      var responseMsg;
      var responseContext;

      for (i = 0; i < intents.length; i++) {
        if(intents[i].tag === data.context) {
          var responseId = getRandomInt(0, intents[i].responses.length - 1);
          responseMsg = intents[i].responses[responseId];
          responseContext = intents[i].context[0];
          break;
        }
      }

      console.log("Intent: " + data.context);
      console.log();

      var botparamsvals;
      if (data.botparams) {
        botparamsvals = data.botparams + ' | ' + data.msg;
      } else {
        botparamsvals = data.msg;
      }

      socket.emit('serverEvent', {intent: data.context, msg: responseMsg, context: responseContext, botparams: botparamsvals});
    }
  });

  socket.on('disconnect', function () {
    console.log('User disconnected');
  });
})

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = router;