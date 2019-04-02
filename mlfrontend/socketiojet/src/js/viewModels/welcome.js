/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your customer ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojpictochart', 'ojs/ojlegend', 'ojs/ojchart', 'ojs/ojbutton'],
 function(oj, ko, $) {

    function CustomerViewModel() {
      var self = this;

      var data = {
      "January" :  [39,42,42,56,49,22,23,21,33,23,37,39,36,32,35,43,32,42,42,40,36,40,39,39,42,31,30,34,36,38,26],
      "February" :  [36,34,26,43,42,27,40,37,29,40,34,40,21,32,25,21,27,33,27,19,32,43,38,24,37,32,30,29],
      "March": [31,39,37,45,40,27,38,49,54,53,59,47,43,51,44,52,57,39,43,38,47,43,38,45,49,62,46,40,46,54,47],
      "April": [51,67,64,60,61,63,62,45,43,56,57,66,68,65,72,64,71,80,64,57,65,69,52,52,62,64,62,71,78,67]};
      var colorHandler = new oj.ColorAttributeGroupHandler();
      var legendItems = [];
      var temp = ["10-20","20-30","30-40","40-50","50-60","60-70","70-80"];
      var colors = ["267db3", "47bdef", "6ddbdb", "a2bf39", "fad55c", "ffb54d", "ed6647", "ed6647"];

      var getPictoItems = function (month, monthIndex){
        var pictoItems = [];
        var values = data[month];
        var firstDay = (new Date(2015, monthIndex, 1)).getDay();
        var pointer = 0;
        for (var i = 0; i < values.length; i++) {
          var val = values[i];
          if(pointer < firstDay){
            pictoItems.push({name: '', color: 'rgba(0,0,0,0)'});
            pointer++;
            i--;
          }
          else
            pictoItems.push({name: month+' '+(i+1)+" ("+val+")", color: "#"+colors[Math.floor(val/10)-1]});
        }
        return pictoItems;
      }

      for (var i = 0; i < temp.length; i++) {
        legendItems.push({text: temp[i] , color: "#"+colors[i]});
      };

      this.janItems = ko.observableArray(getPictoItems('January', 0));
      this.febItems = ko.observableArray(getPictoItems('February', 1));
      this.marItems = ko.observableArray(getPictoItems('March', 2));
      this.aprilItems = ko.observableArray(getPictoItems('April', 3));
      this.legendSections = ko.observableArray([{items: legendItems}]);

      this.tooltipFunction = function (dataContext) {
        return {'insert':dataContext.name};
      }

      var getEvents = function(index) {
      var start = new Date(2015,6,1).getTime();
      var end = new Date(2015,6,31).getTime();
      var items = [];
      var numEvents = Math.random() * 100;
      for (var i = 0; i < numEvents; i++) {
        items.push({y: index, x: new Date(start + Math.random() * (end - start)).toISOString()});
      }
      return items;
    }

    self.eventNames = {format: function(value) {
      if (value == 5)
        return 'Heart Diagnostic';
      else if (value == 4)
        return 'General Therapy';
      else if (value == 3)
        return 'Rehabilitation';
      else if (value == 2)
        return 'Visual Scanning';
      else if (value == 1)
        return 'Blood tests';
      else
        return 'Monitoring';
    }}

    self.seriesValue = [
      {items: getEvents(5), name: self.eventNames.format(5), color: 'rgba(38,125,179,0.35)'},
      {items: getEvents(4), name: self.eventNames.format(4), color: 'rgba(104,193,130,0.35)'},
      {items: getEvents(3), name: self.eventNames.format(3), color: 'rgba(250,213,92,0.35)'},
      {items: getEvents(2), name: self.eventNames.format(2), color: 'rgba(237,102,71,0.35)'},
      {items: getEvents(1), name: self.eventNames.format(1), color: 'rgba(133,97,200,0.35)'},
      {items: getEvents(0), name: self.eventNames.format(0), color: 'rgba(109,219,219,0.35)'}
    ];

    self.refObjValue = [];
    for (var i = 0; i < self.seriesValue.length; i++) {
      self.refObjValue.push({type: 'line', color: 'rgba(196,206,215,1)', value: i + 0.5});
    }

      // Below are a subset of the ViewModel methods invoked by the ojModule binding
      // Please reference the ojModule jsDoc for additional available methods.

      /**
       * Optional ViewModel method invoked when this ViewModel is about to be
       * used for the View transition.  The application can put data fetch logic
       * here that can return a Promise which will delay the handleAttached function
       * call below until the Promise is resolved.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
       * the promise is resolved
       */
      self.handleActivated = function(info) {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
       */
      self.handleAttached = function(info) {
        // Implement if needed
      };


      /**
       * Optional ViewModel method invoked after the bindings are applied on this View.
       * If the current View is retrieved from cache, the bindings will not be re-applied
       * and this callback will not be invoked.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       */
      self.handleBindingsApplied = function(info) {
        // Implement if needed
      };

      /*
       * Optional ViewModel method invoked after the View is removed from the
       * document DOM.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
       */
      self.handleDetached = function(info) {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new CustomerViewModel();
  }
);
