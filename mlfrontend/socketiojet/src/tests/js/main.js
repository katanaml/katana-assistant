/**
  Copyright (c) 2015, 2018, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';

requirejs.config(
  {
    baseUrl : '../../js',
    // Path mappings for the logical module names
    paths :
        {
          'knockout' : 'libs/knockout/knockout-3.4.0.debug',
          'jquery' : 'libs/jquery/jquery-3.1.1',
          'jqueryui-amd' : 'libs/jquery/jqueryui-amd-1.12.0',
          'promise' : 'libs/es6-promise/es6-promise',
          'hammerjs' : 'libs/hammer/hammer-2.0.8',
          'ojdnd' : 'libs/dnd-polyfill/dnd-polyfill-1.0.0',
          'ojs' : 'libs/oj/v4.2.0/debug',
          'ojL10n' : 'libs/oj/v4.2.0/ojL10n',
          'ojtranslations' : 'libs/oj/v4.2.0/resources',
          'text' : 'libs/require/text',
          'css' : 'libs/require-css/css',
          'signals' : 'libs/js-signals/signals',
          'customElements': 'libs/webcomponents/custom-elements.min',
          'test' : '../tests/js/test'
        }
      ,
      // Shim configurations for modules that do not expose AMD
      shim :
        {
          'jquery' :
            {
              exports : ['jQuery', '$']
            },
          'simulate' :
            {
              deps : ['jquery']
            },
          'test' :
            {
              deps : ['jquery', 'knockout', 'ojs/ojcore', 'ojs/ojknockout', 'ojs/ojcomponentcore']
            }
        }
    }
  );

  require(['ojs/ojcore', 'knockout', 'ojs/ojknockout', 'test'],
    function (oj, ko)
    {
      $(function ()
      {
        QUnit.load();
        QUnit.start();
      });
    }
  );
