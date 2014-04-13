(function() {

    var app = window.FRETBOARDER = window.FRETBOARDER || { };

    var MAXFRETS = 24;

    app.Fretboard = Backbone.Model.extend({
        defaults: function() {
            return {
                data: { }
            }
        },

        setDot: function(string, fret, dotOrNot) {
            this.setDots([[string, fret, dotOrNot]]);
        },

        setDots: function(tuples) { /* tuple form: [ string, fret, dotOrNot ] */
            var self = this;
            var data = $.extend(true, {}, this.get('data'));
            _.each(tuples, function(tuple) {
                var key = self._key(tuple[0], tuple[1]);
                if (tuple[2])
                    data[key] = 1;
                else
                    delete data[key];
            });
            debugger;
            this.set('data', data);
        },

        getDot: function(string, fret) {
            return this.get('data')[this._key(string, fret)];
        },

        _key: function(string, fret) {
            return string * MAXFRETS + fret;
        }
    });

}());
