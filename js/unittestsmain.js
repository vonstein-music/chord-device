"use strict";
require.config({
    paths: {
        'QUnit': 'libs/qunit',
        '_': 'libs/lodash'
    }
});

require(
    ['QUnit', '_', 'tests/midiTest'],
    function(QUnit, _, midiTest) {
        // run the tests.
        midiTest.run();

        // start QUnit.
        QUnit.load();
        QUnit.start();
    }
);