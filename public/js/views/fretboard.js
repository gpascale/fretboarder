(function() {

	var app = window.FRETBOARDER = window.FRETBOARDER || { };

	var makeSVG = function(tag, attrs) {
		var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
		for (var k in attrs)
			el.setAttribute(k, attrs[k]);
		return el;
	};

	app.FretboardView = Backbone.View.extend(/** @lends LightboxView.prototype */ {
        template: _.template($("#fretboardTemplate").html()),
        className: 'fretboardView',

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

		showDots: function(key, degrees) {
			var data = [ ];
			var degreeSet = { };
			for (var i = 0; i < degrees.length; ++i) {
				var note = (key + degrees[i]) % 12;
				degreeSet[note] = 1;
			}
			var offsets = [24, 19, 15, 10, 5, 0];
			for (var string = 0; string < 6; ++string) {
				for (var fret = 0; fret < 15; ++fret) {
					var note = (offsets[string] + fret) % 12;
					if (degreeSet[note])
						data.push([ string, fret ]);
				}
			}

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
	 		.style("fill", function(d) { return self._dotColor(((offsets[d[0]] + d[1]) + 12 - key) % 12); });

			sel.exit()
			.transition()
			.duration(1000)
			.style('opacity', 0)
			.remove();

			sel.enter()
			.append('circle')
			.style("fill", function(d) { return self._dotColor(((offsets[d[0]] + d[1]) + 12 - key) % 12); })
			.attr('opacity', 0)
			.attr("cx", function(d) { return self._dotPosition(d[0],d[1]).x; })
	 		.attr("cy", function(d) { return self._dotPosition(d[0],d[1]).y; })
			.attr("r", 20)
			.transition()
			.duration(1000)
			.style("opacity", 1)
			.attr("class", "note");
		}
    });
}());