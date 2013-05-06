(function(NT) {
    'use strict';

    NT.Surface = Backbone.View.extend({
        tagName: 'canvas',
        className: 'nt-surface',

        initialize: function() {
            var that = this;
            this.el.height = NT.options.SQUARE_SIZE * NT.options.ROWS + NT.options.ROWS;
            this.el.width = NT.options.SQUARE_SIZE * NT.options.COLS;

            this.bounds = new createjs.Rectangle();
            this.bounds.width = this.el.width;
            this.bounds.height = this.el.height;

            this.stage = new createjs.Stage(this.el);
            this.addShape();

            _.each(_.range(18), function(i) {
                _.delay(function() {
                    that.updateShape(i);
                }, 200 * i);
            });
        },


        addShape: function() {
            var shape = new NT.Shape(
                NT.SHAPES.Z,
                1
            );

            this.shape = new createjs.Shape(shape.graphics)

            this.stage.addChild(this.shape);
            this.stage.update();
        },

        updateShape: function() {
            this.shape.y += NT.options.SQUARE_SIZE;
            this.stage.update();
        }
    });
})(NT);
