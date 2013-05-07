(function(NT) {
    'use strict';

    NT.Surface = Backbone.View.extend({
        tagName: 'canvas',
        className: 'nt-surface',

        events: {
            'click ': 'toggleTicker'
        },

        shapes: [],

        initialize: function() {
            var that = this;
            this.el.height = NT.options.SQUARE_SIZE * NT.options.ROWS;
            this.el.width = NT.options.SQUARE_SIZE * NT.options.COLS;

            this.bounds = new createjs.Rectangle();
            this.bounds.width = this.el.width;
            this.bounds.height = this.el.height;

            this.stage = new createjs.Stage(this.el);

            createjs.Ticker.setInterval(400);

            createjs.Ticker.addEventListener('tick', _.bind(this.handleTick, this));

            $(window).on('keydown', _.bind(this.handleKeyboardEvents, this));

            this.addShape();
        },


        handleTick: function(event) {
            if (!event.paused) {
                this.updateShape();
            }
        },


        toggleTicker: function(e) {
            this.isPaused = !this.isPaused;
            createjs.Ticker.setPaused(Boolean(this.isPaused));
        },


        addShape: function() {
            var shape = NT.SHAPES[_.keys(NT.SHAPES)[_.random(0, _.keys(NT.SHAPES).length-1)]];
            this.shape = new NT.Shape(
                shape,
                _.random(0, (shape.positions.length -1))
            );
            window.shape = this.shape;

            this.stage.addChild(this.shape.shape);
            this.stage.update();
        },


        updateShape: function() {
            if (this.shape.incY(this.shapes)) {
                this.stage.update();
            } else {
                this.shapes.push(this.shape);
                this.addShape();
            }
        },


        handleKeyboardEvents: function(e) {
            if (e.keyCode === 37) {
                this.shape.incX(-1);
            } else if (e.keyCode === 39) {
                this.shape.incX(1);
            } else {
                return;
            }

            e.stopPropagation();
        }
    });
})(NT);
