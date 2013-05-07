(function(NT) {
    'use strict';

    NT.Shape = function(shape, position) {
        var graphics = new createjs.Graphics();
        graphics.beginFill(shape.color);

        this.grid = shape.positions[position];

        var xPos = Math.floor((NT.options.COLS - this.getWidth()) / 2);

        _.each(this.grid, function(row, i) {
            _.each(row, function(col, j) {
                if (col) {
                    graphics.drawRect(
                        NT.options.SQUARE_SIZE * j +1,
                        NT.options.SQUARE_SIZE * i + 1,
                        NT.options.SQUARE_SIZE -2,
                        NT.options.SQUARE_SIZE -2
                    );
                }
            });
        });


        this.shape = new createjs.Shape(graphics);
        this.shape.x = xPos * NT.options.SQUARE_SIZE;
    };


    NT.Shape.prototype = _.extend(NT.Shape.prototype, {
        getWidth: function() {
            return _.countBy(_.max(this.grid, function(e) {
                return _.countBy(e)[1];
            }))[1];
        },


        getHeight: function() {
            return _.reduce(
                _.map(this.grid, function(row) {
                    return _.any(row) && 1 || 0;
                }),
                function(sum, i) {
                    return sum + i;
                }
            );
        },


        isOnBottom: function(y) {
            if (y + this.getHeight() === NT.options.ROWS) {
                return true;
            }

            return false;
        },


        getCoords: function(y) {
            y = y || (this.shape.y / NT.options.SQUARE_SIZE);
            var x = this.shape.x / NT.options.SQUARE_SIZE;

            var coords = {};

            _.each(this.grid, function(row, i) {
                _.each(row, function(col, j) {
                    if (col) {
                        coords[[x + j, y + i]] = true;
                    }
                });
            });

            return coords;
        },


        collidesWithOthers: function(y, others) {
            var that = this;
            return _.any(_.map(others, function(other) {
                return that.collidesWith(y, other);
            }));
        },


        collidesWith: function(y, other) {
            var collides = false;

            _.each(this.getCoords(y), function(val, coords) {
                if (other.getCoords()[coords]) {
                    collides = true;
                }
            });

            return collides;
        },


        incY: function(others) {
            var y = this.shape.y / NT.options.SQUARE_SIZE;

            if (!this.isOnBottom(y) && !this.collidesWithOthers(y+1, others)) {
                y += 1;
                this.shape.y = y * NT.options.SQUARE_SIZE;
                return true;
            } else {
                return false;
            }
        },


        incX: function(coefficient) {
            var x = this.shape.x / NT.options.SQUARE_SIZE;
            x += coefficient;

            if (x < 0 || x + this.getWidth() > NT.options.COLS) {
                return;
            } else {
                this.shape.x = x * NT.options.SQUARE_SIZE;
            }
        }
    });


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
