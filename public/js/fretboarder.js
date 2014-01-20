;(function() {
this["Fretboarder"] = this["Fretboarder"] || {};
this["Fretboarder"]["Templates"] = this["Fretboarder"]["Templates"] || {};

this["Fretboarder"]["Templates"]["dropdown"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<div class="btn-group">\n\t<a class="btn dropdown-toggle" data-toggle="dropdown" href="#">\n\t\t<span class="selected">E</span>\n\t\t<span class="caret"></span>\n\t</a>\n\t<ul class="dropdown-menu">\n\t\t<!-- dropdown menu links -->\n\t</ul>\n</div>';return __p};

this["Fretboarder"]["Templates"]["fretboard"] = function(data) {var __t, __p = '', __e = _.escape;__p += '';return __p};
})();
(function() {
(function() {

	var app = window.FRETBOARDER = window.FRETBOARDER || { };
	var common = app.common = app.common || { };

	common.randInt = function(min, max) {
		return Math.floor(min + Math.random() * (max - min + 1));
	}

	common.offsets = [24, 19, 15, 10, 5, 0];
	common.relativeOffsets = [5, 4, 5, 5, 5, 0];

}());
})();
(function() {
(function() {
	
	var app = window.FRETBOARDER = window.FRETBOARDER || { };

	var _selectedKey = 0;
	var _selectedDegrees = [ 0 ];

	app.showFreeplay = function() {
		var fretboard = app.fretboard;
		$('#footerContainer').empty();

		// Keys dropdown
		var keysDropdown = new app.DropdownView({ 
			values: [ 'E', 'F', 'F# / Gb', 'G', 'G#/ Ab', 'A', 'A# / Bb', 'B', 'C', 'C# / Db', 'D', 'D# / Eb' ] 
		});
		keysDropdown.render();
		$('#footerContainer').append(keysDropdown.$el);
		keysDropdown.on('selectionChanged', function(key) {
			_selectedKey = key;
			fretboard.showKeyDegrees(_selectedKey, _selectedDegrees);
		});

		// Degrees dropdown
		var pitchCollections = {
			'Roots' : [ 0 ],
			'Major Triad Chord Tones' : [ 0, 4, 7 ],
			'Minor Triad Chord Tones' : [ 0, 3, 7 ],
			'Augmented Triad Chord Tones' : [ 0, 4, 8 ],
			'Diminished Triad Chord Tones' : [ 0, 3, 6],
			'Major 7 Chord Tones' : [ 0, 4, 7, 11 ],
			'Dominant 7 Chord Tones' : [ 0, 4, 7, 10 ],
			'Minor 7 Chord Tones' : [ 0, 3, 7, 10 ],
			'Minor 7 b5 Chord Tones' : [ 0, 3, 6, 10 ],
			'Major Scale': [ 0, 2, 4, 5, 7, 9, 11 ],
			'Dorian': [ 0, 2, 3, 5, 7, 9, 10 ],
			'Aeolian': [ 0, 2, 3, 5, 7, 8, 10 ],
			'Melodic Minor': [ 0, 2, 3, 5, 7, 9, 11 ]
		}
		var degreesDropdown = new app.DropdownView({
			values: _.keys(pitchCollections),
			data: _.values(pitchCollections)
		})
		degreesDropdown.render();
		$('#footerContainer').append(degreesDropdown.$el);
		degreesDropdown.on('selectionChanged', function(degrees) {
			_selectedDegrees = degrees;
			fretboard.showKeyDegrees(_selectedKey, _selectedDegrees);
		});

		fretboard.showKeyDegrees(_selectedKey, _selectedDegrees);
	};
}());
})();
(function() {
(function() {

	var app = window.FRETBOARDER = window.FRETBOARDER || { };

	$(document).ready(function() {
		var fretboard = app.fretboard = new app.FretboardView({ width: 800, height: 240 });
		fretboard.render();
		$('#fretboardContainer').append(fretboard.$el);

		$('.nav li a').on('click', function() {
			$(this).parents('.nav').children().removeClass('active');
			$(this).parent().addClass('active');
			switch ($(this).parent().index()) {
				case 0:
				    app.showFreeplay();
				    break;
				case 1:
				    app.showIntervalQuiz();
				    break;
				case 2:
					app.showNoteNameQuiz();
					break;
			}
		});

		app.showFreeplay();
	});

})();
})();
(function() {
(function() {
	
	var app = window.FRETBOARDER = window.FRETBOARDER || { };
	var common = app.common = app.common || { };

	var _selectedKey = 0;
	var _selectedDegrees = [ 0 ];

	var _curInterval;
	var _numCorrect = 0;
	var _numTotal = 0;

	app.showIntervalQuiz = function() {
		var fretboard = app.fretboard;
		$('#headerContainer').empty();
		$('#footerContainer').empty();
		fretboard.showKeyDegrees();

		var $score = $('<span class="correct">0</span>/<span class="total">0</span>');
		$('#headerContainer').append($score);

		var buttons = new Backbone.View({
			el: _.template($("#quizButtonsTemplate").html())(),
        	className: 'quizButtons'
        });
        buttons.render();
        $('#footerContainer').append(buttons.$el);

        function newQuestion() {
        	var rootString = common.randInt(3, 5);
			var rootFret = 5;
			var upperString = common.randInt(0, rootString - 1);
			var upperFret = common.randInt(rootFret - 2, rootFret + 2);

			var interval = 0;
			for (var str = upperString; str < rootString; ++str)
				interval += common.relativeOffsets[str];
			interval += (upperFret - rootFret);
			interval = interval % 12;
			_curInterval = interval;

			fretboard.showDots([[rootString, rootFret, 'red'], [upperString, upperFret, 'green']]);
        }

        $('.quizButtons .btn').on('click', function() {
        	if ($(this).index() == _curInterval) {
        		++_numCorrect;
        		newQuestion();
        	}
        	++_numTotal;
        	$('.correct').html(_numCorrect);
        	$('.total').html(_numTotal); 
        });

        newQuestion();
	};

}());
})();
(function() {
;(function() {
    
    var app = window.FRETBOARDER = window.FRETBOARDER || { };
    var common = app.common = app.common || { };

    app.showNoteNameQuiz = function() {
        var fretboard = app.fretboard;
        $('#headerContainer').empty();
        $('#footerContainer').empty();
        fretboard.showKeyDegrees();
        next();

        function next() {
            var degree = Math.floor(Math.random() * 12);
            console.log('degree ' + degree);
            fretboard.on('clicked', function(data) {
                console.log('clicked');
                console.dir(data);
                fretboard.off('clicked');
                fretboard.showKeyDegrees(0, [degree]);
                setTimeout(function() {
                    fretboard.showKeyDegrees();
                    next();
                }, 1000);
            });
        }
    };

}());
})();
(function() {
(function() {

	var app = window.FRETBOARDER = window.FRETBOARDER || { };

	app.DropdownView = Backbone.View.extend({
        template: _.template($("#dropdownTemplate").html()),
        className: 'dropdownView',

        _options: null,
        _data: null,

        initialize: function(options) {
        	this._options = options;
        },

        render: function() {
        	var self = this;
                var data = this._options ? this._options.data : null;
        	this.$el.html(this.template());
        	if (this._options && this._options.values) {
        		for (var i = 0; i < this._options.values.length; ++i) {
        			this.$('.dropdown-menu').append('<li><a href="#">' + this._options.values[i] + '</a></li>');
        		}
                        this.$('.selected').html(this._options.values[0]);
                        this.$('.selected').text(this._options.values[0]);
        	}
        	this.$el.on('click', 'li a', function() {
        		self.$('.selected').html($(this).html());
        		self.$('.selected').text($(this).html());
                        var index = $(this).parent().index();
                        var dataVal = data ? data[index] : index;
        		self.trigger('selectionChanged', dataVal);
        	});
        },

        remove: function() {

        }
	});

}());
})();
(function() {
(function() {

	var app = window.FRETBOARDER = window.FRETBOARDER || { };

	var makeSVG = function(tag, attrs) {
		var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
		for (var k in attrs)
			el.setAttribute(k, attrs[k]);
		return el;
	};

	var offsets = [24, 19, 15, 10, 5, 0];

	app.FretboardView = Backbone.View.extend(/** @lends LightboxView.prototype */ {
        template: _.template($("#fretboardTemplate").html()),
        className: 'fretboardView',
        events: {
        	'click': '_onClick'
        },

        _fretboardWidth: 800,
		_fretboardHeight: 600,
		_nutWidth: 20,
		_fretWidth: 10,
		_stringWidth: 4,

        initialize: function(options){
   			if (options && options.width)
   				this._fretboardWidth = options.width;
   			if (options && options.height)
   				this._fretboardHeight = options.height;
  		},

  		render: function(){
    		this.$el.html(this.template());

			var svg = $('<svg xmlns="http://www.w3.org/2000/svg" version="1.1"' +
				'width="' + this._fretboardWidth + '" height="' + this._fretboardHeight + '"></svg>').get(0);

			// Nut
			var nut = makeSVG('line', { 
				x1: 10, y1: 0, x2: 10, y2: this._fretboardHeight, stroke: 'rgb(0, 0, 0)', 'stroke-width': 20 
			});
			svg.appendChild(nut);

			// Frets
			for (var i = 1; i < 15; ++i) {
				var x = 0.5 * this._nutWidth + (this._fretboardWidth - this._fretWidth) / 14 * i;
				var fret = makeSVG('line', {
					x1: x, y1: 0, x2: x, y2: this._fretboardHeight, stroke: 'rgb(0, 0, 0)', 'stroke-width': this._fretWidth
				});
				svg.appendChild(fret);
			}

			// Strings
			for (var i = 0; i < 6; ++i) {
				var y = 0.5 * this._stringWidth + (this._fretboardHeight - this._stringWidth) / 5 * i;
				var string = makeSVG('line', { 
					x1: 0, y1: y, x2: this._fretboardWidth, y2: y, stroke: 'rgb(150, 150, 150)', 'stroke-width': this._stringWidth
				});
				svg.appendChild(string);
			}

			// Dots
			var frets = [ 3, 5, 7, 9 ];
			for (var i = 0; i < frets.length; ++i) {
				var fret = frets[i];
				var p = this._dotPosition(2.5, fret);
				var dot = makeSVG('circle', {
					cx: p.x, cy: p.y, r: '12', stroke: 'rgb(0, 0, 0)'
				});
				svg.appendChild(dot);
			}
			// 12th fret gets 2 dots
			var p1 = this._dotPosition(1.5, 12);
			var p2 = this._dotPosition(3.5, 12);
			var dot1 = makeSVG('circle', {
				cx: p1.x, cy: p1.y, r: '12', stroke: 'rgb(0, 0, 0)'
			});
			var dot2 = makeSVG('circle', {
				cx: p2.x, cy: p2.y, r: '12', stroke: 'rgb(0, 0, 0)'
			});
			svg.appendChild(dot1);
			svg.appendChild(dot2);

			svg.appendChild(makeSVG('g'));

			this.$el.append($(svg));
  		},

  		showKeyDegrees: function(key, degrees) {
			if (key == null)
				key = 0;
			if (degrees == null)
				degrees = [ ];
			var data = [ ];
			var degreeSet = { };
			for (var i = 0; i < degrees.length; ++i) {
				var note = (key + degrees[i]) % 12;
				degreeSet[note] = 1;
			}
			
			for (var string = 0; string < 6; ++string) {
				for (var fret = 0; fret < 15; ++fret) {
					var note = (offsets[string] + fret) % 12;
					if (degreeSet[note]) {
						var color = this._dotColor(((offsets[string] + fret) + 12 - key) % 12)
						data.push([ string, fret, color ]);
					}
				}
			}

			this._setData(data);
		},

		showDots: function(dots) {
			if (dots == null)
				dots = [ ];
			if (dots.length == 2 && typeof dots[0] == 'number')
				dots = [ [ dots[0], dots[1] ] ];
			this._setData(dots);
		},

		reset: function() {
			showKeyDegrees();
		},

		_dotPosition: function(string, fret) {
			var fretDistance = (this._fretboardWidth - this._fretWidth) / 14;
			var stringDistance = (this._fretboardHeight - this._stringWidth) / 5;
			var x = 0.5 * this._nutWidth + (fret - 0.5) * fretDistance;
			var y = 0.5 * this._stringWidth + string * stringDistance;
			return { x: x, y: y };
		},

		_dotColor: function(degree) {
			return [ 'red', 'brown', 'aqua', 'green', 'blue', 'orange',
					 'black', 'darkorchid', 'darkgreen', 'yellow',
					 'palevioletred', 'springgreen' ][degree];
		},

		_setData: function(data) {
			var self = this;
			var vis = d3.select('svg g');
			var sel = vis.selectAll('circle').data(data, function(d) {
				return d[0] * 24 + d[1];
			});
			
			sel
			.transition()
			.duration(1000)
			.attr("cx", function(d) { return self._dotPosition(d[0],d[1]).x; })
	 		.attr("cy", function(d) { return self._dotPosition(d[0],d[1]).y; })
	 		.style("fill", function(d) { return d[2] ? d[2] : '#000'; });

			sel.exit()
			.transition()
			.duration(1000)
			.style('opacity', 0)
			.remove();

			sel.enter()
			.append('circle')
			.style("fill", function(d) { return d[2] ? d[2] : '#000'; })
			.attr('opacity', 0)
			.attr("cx", function(d) { return self._dotPosition(d[0],d[1]).x; })
	 		.attr("cy", function(d) { return self._dotPosition(d[0],d[1]).y; })
			.attr("r", 20)
			.transition()
			.duration(1000)
			.style("opacity", 1)
			.attr("class", "note");
		},

		_onClick: function(e) {
			var x = e.offsetX - this.$('svg').offset().left;
			var y = e.offsetY - this.$('svg').offset().top;
			var best = [ -1, -1, 10000000 ];
			for (var string = 0; string < 6; ++string) {
				for (var fret = 0; fret < 15; ++fret) {
					var center = this._dotPosition(string, fret);
					var dist = Math.sqrt((x - center.x) * (x - center.x) +
										 (y - center.y) * (y - center.y));
					if (dist < best[2]) {						
						best[0] = string;
						best[1] = fret;
						best[2] = dist;
					}
				}
			}
			if (best[2] < 50)
				this.trigger('clicked', { string: best[0], fret: best[1] });
		}
    });
}());})();
