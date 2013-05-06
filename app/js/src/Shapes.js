(function(NT) {
    'use strict';

    NT.Shape = function(shape, position) {
        var that = this;
        this.graphics = new createjs.Graphics();
        this.graphics.beginFill(shape.color);

        var grid = shape.positions[position];

        var maxLength = _.countBy(_.max(grid, function(e) {
            return _.countBy(e)[1];
        }))[1];

        var xPos = Math.floor((NT.options.COLS - maxLength) / 2);
        xPos = xPos * NT.options.SQUARE_SIZE;

        _.each(grid, function(row, i) {
            _.each(row, function(col, j) {
                if (col) {
                    that.graphics.drawRect(
                        xPos + NT.options.SQUARE_SIZE * j +1,
                        NT.options.SQUARE_SIZE * i + 1,
                        NT.options.SQUARE_SIZE -2,
                        NT.options.SQUARE_SIZE -2
                    );
                }
            });
        });
    };

    NT.SHAPES = {
        I: {
            color: NT.COLORS.CYAN,
            positions: [
                [
                    [1, 1, 1, 1],
                ], [
                    [1],
                    [1],
                    [1],
                    [1]
                ]
            ]
        },

        T: {
            color: NT.COLORS.MAGENTA,
            positions: [
                [
                    [0, 0, 0],
                    [1, 1, 1],
                    [0, 1, 0]
                ], [
                    [0, 1, 0],
                    [1, 1, 1]
                ], [
                    [0, 1],
                    [1, 1],
                    [0, 1]
                ], [
                    [1, 0],
                    [1, 1],
                    [1, 0]
                ]
            ]
        },

        L: {
            color: NT.COLORS.ORANGE,
            positions: [
                [
                    [1, 1, 1],
                    [1, 0, 0]
                ], [
                    [1, 1],
                    [0, 1],
                    [0, 1]
                ], [
                    [0, 0, 1],
                    [1, 1, 1]
                ], [
                    [1, 0],
                    [1, 0],
                    [1, 1]
                ]
            ]
        },

        J: {
            color: NT.COLORS.BLUE,
            positions: [
                [
                    [1, 1, 1],
                    [0, 0, 1]
                ], [
                    [0, 1],
                    [0, 1],
                    [1, 1]
                ], [
                    [1, 0, 0],
                    [1, 1, 1]
                ], [
                    [1, 1],
                    [1, 0],
                    [1, 0]
                ]
            ]
        },

        S: {
            color: NT.COLORS.GREEN,
            positions: [
                [
                    [0, 1, 1],
                    [1, 1, 0]
                ], [
                    [1, 0],
                    [1, 1],
                    [0, 1]
                ], [
                    [0, 1, 1],
                    [1, 1, 0]
                ], [
                    [1, 0],
                    [1, 1],
                    [0, 1]
                ]
            ]
        },

        Z: {
            color: NT.COLORS.RED,
            positions: [
                [
                    [1, 1, 0],
                    [0, 1, 1]
                ], [
                    [0, 1],
                    [1, 1],
                    [1, 0]
                ], [
                    [1, 1, 0],
                    [0, 1, 1]
                ], [
                    [0, 1],
                    [1, 1],
                    [1, 0]
                ]
            ]
        },

        O: {
            color: NT.COLORS.YELLOW,
            positions: [
                [
                    [1, 1],
                    [1, 1]
                ]
            ]
        }
    };
})(NT);
