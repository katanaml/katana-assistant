/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojlabel',
        'ojs/ojcomposite', 'jet-composites/bot-client/loader', 'ojs/ojoffcanvas',
        'ojs/ojinputnumber', 'ojs/ojswitch', 'ojs/ojmodule'],
 function(oj, ko, $) {

    function DashboardViewModel() {
      var self = this;

      self.centralModule = ko.observable('welcome');

      self.handleBot = function(event) {
        var intent = event.detail.botintent;
        var botparams = event.detail.botparams;

        if (intent === 'adverse_drug') {
          self.centralModule('adversedrug');
        } else if (intent === 'blood_pressure') {
          self.centralModule('bloodpressure');
        } else if (intent === 'search_blood_pressure_by_patient_id') {
          oj.Router.rootInstance.store(botparams);
          self.centralModule('bloodpressuresearch');
        } else if (intent === 'search_pharmacy_by_name') {
          console.log('PARAMS: ' + botparams);
          self.centralModule('pharmacysearch');
        } else if (intent === 'search_hospital_by_type') {
          console.log('PARAMS: ' + botparams);
          self.centralModule('hospitalsearch');
        } else if (intent === 'welcome') {
          self.centralModule('welcome');
        }
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new DashboardViewModel();
  }
);
