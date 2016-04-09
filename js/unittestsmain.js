"use strict";
require.config({
    paths: {
        'QUnit': 'libs/qunit'
    },
    shim: {
       'QUnit': {
           exports: 'QUnit',
           init: function() {
               QUnit.config.autoload = false;
               QUnit.config.autostart = false;
           }
       } 
    }
});

require(
    ['QUnit', 'tests/midiTest'],
    function(QUnit, midiTest) {
        // run the tests.
        midiTest.run();

        // start QUnit.
        QUnit.load();
        QUnit.start();
    }
);