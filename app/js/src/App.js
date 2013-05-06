var NT = null;

(function() {
    'use strict';

    var Nettetris = function() {};

    _.extend(Nettetris.prototype, Backbone.Events, {
        el: '.nt-viewport',
        options: {
            SQUARE_SIZE: 40,
            ROWS: 22,
            COLS: 10
        },

        start: function() {
            NT.surface = new NT.Surface();
            NT.surface.render()

            $('body').html(
                NT.surface.el
            );
        }
    });

    NT = new Nettetris();
})();
