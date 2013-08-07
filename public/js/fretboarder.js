(function() {

	var _fretboardWidth;
	var _fretboardHeight;
	var _nutWidth = 20;
	var _fretWidth = 10;
	var _stringWidth = 4;

	function makeSVG(tag, attrs) {
		var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
		for (var k in attrs)
			el.setAttribute(k, attrs[k]);
		return el;
	}

	function buildFretboard(fretboardWidth, fretboardHeight) {
		_fretboardWidth = fretboardWidth;
		_fretboardHeight = fretboardHeight;

		var svg = $('<svg xmlns="http://www.w3.org/2000/svg" version="1.1"' +
			'width="' + _fretboardWidth + '" height="' + _fretboardHeight + '"></svg>').get(0);

		// Nut
		var nut = makeSVG('line', { 
			x1: 10, y1: 0, x2: 10, y2: _fretboardHeight, stroke: 'rgb(0, 0, 0)', 'stroke-width': 20 
		});
		svg.appendChild(nut);

		// Frets
		for (var i = 1; i < 15; ++i) {
			var x = 0.5 * _nutWidth + (_fretboardWidth - _fretWidth) / 14 * i;
			var fret = makeSVG('line', {
				x1: x, y1: 0, x2: x, y2: _fretboardHeight, stroke: 'rgb(0, 0, 0)', 'stroke-width': _fretWidth
			});
			svg.appendChild(fret);
		}

		// Strings
		for (var i = 0; i < 6; ++i) {
			var y = 0.5 * _stringWidth + (_fretboardHeight - _stringWidth) / 5 * i;
			var string = makeSVG('line', { 
				x1: 0, y1: y, x2: _fretboardWidth, y2: y, stroke: 'rgb(150, 150, 150)', 'stroke-width': _stringWidth
			});
			svg.appendChild(string);
		}

		// Dots
		var frets = [3, 5, 7, 9, 12];
		for (var i = 0; i < frets.length; ++i) {
			var fret = frets[i];
			var p = dotPosition(2.5, fret);
			var dot = makeSVG('circle', {
				cx: p.x, cy: p.y, r: '12', stroke: 'rgb(0, 0, 0)'
			});
			svg.appendChild(dot);
		}

		svg.appendChild(makeSVG('g'));

		$('body').append(svg);
	}

	function dotPosition(string, fret) {
		var fretDistance = (_fretboardWidth - _fretWidth) / 14;
		var stringDistance = (_fretboardHeight - _stringWidth) / 5;
		var x = 0.5 * _nutWidth + (fret - 0.5) * fretDistance;
		var y = 0.5 * _stringWidth + string * stringDistance;
		return { x: x, y: y };
	}

	function showDots() {
		var data = [ [1, 5], [2, 2], [3, 8], [5, 12], [0, 8] ];
		var vis = d3.select('svg g');
		vis.selectAll('circle')
		.data(data)
		.enter()
		.append('circle')
		.style("fill", "purple")
		.attr('opacity', 0)
		.attr("cx", function(d) { return dotPosition(d[0],d[1]).x; })
 		.attr("cy", function(d) { return dotPosition(d[0],d[1]).y; })
		.attr("r", 20)
		.transition()
		.delay(300)
		.duration(500)
		.style("opacity", 1)
		.attr("class", "note");
	}

	$(document).ready(function() {
		buildFretboard(1000, 300);
		showDots();
	});

})();