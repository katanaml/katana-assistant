/**
  Copyright (c) 2015, 2018, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(
    ['ojs/ojcore', 'knockout', 'socket.io', 'jquery', 'ojs/ojbutton',
    'ojs/ojinputtext', 'ojs/ojlabel'], function (oj, ko, io, $) {
    'use strict';

    function BotComponentModel(context) {
        var self = this;

        window.addEventListener("resize", function(event) {
          self.chatbotAreaHeight((document.body.clientHeight - 140) + "px");
        });
        self.chatbotAreaHeight = ko.observable((document.body.clientHeight - 140) + "px");

        var socket = io.connect("localhost:8000");
        socket.on('connect', function() {
          console.log('Socket connected: ', socket.connected);
        });

        self.userText = ko.observable();
        self.chatContext = ko.observable();
        self.botParams = ko.observable();

        self.chatItems = ko.observableArray([]);

        self.composite = context.element;

        context.props.then(function (propertyMap) {
            self.properties = propertyMap;
        });

        self.sendEvent = function(event) {
          if (self.userText()) {
            self.chatItems.push({id: self.chatItems().length + 1, payload: self.userText(), bot: false});
            socket.emit('clientEvent', {msg: self.userText(), context: self.chatContext(), botparams: self.botParams()});

            self.userText(null);

            var objDiv = document.getElementById("chatview");
            objDiv.scrollTop = objDiv.scrollHeight;
          }
        };

        socket.on("serverEvent", function (data) {
          console.log("Intent: " + data.intent);
          console.log("Bot message: " + data.msg);
          console.log("Chat context: " + data.context);
          console.log("Bot params: " + data.botparams);

          self.chatContext(data.context);
          self.botParams(data.botparams);

          self.chatItems.push({id: self.chatItems().length + 1, payload: data.msg, bot: true});

          var params = {
            'bubbles': true,
            'detail': {
              'botintent': data.intent,
              'botparams': data.botparams
            }
          };
          self.composite.dispatchEvent(new CustomEvent('handleBot', params));

          var objDiv = document.getElementById("chatview");
          objDiv.scrollTop = objDiv.scrollHeight;
        })

        self.resetContext = function(event) {
          self.chatContext(null);
          self.chatItems.removeAll();

          var params = {
            'bubbles': true,
            'detail': {
              'botintent': 'welcome'
            }
          };
          self.composite.dispatchEvent(new CustomEvent('handleBot', params));
        };
    };

    return BotComponentModel;
});
