var NT = null;

(function(NT) {
    'use strict';

    var Nettetris = function() {};

    _.extend(Nettetris.prototype, Backbone.Events, {
        el: '.nt-viewport'
    });

    NT = new Nettetris();
})(NT);
