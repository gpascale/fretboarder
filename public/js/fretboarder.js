(function() {

	function makeSVG(tag, attrs) {
		var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
		for (var k in attrs)
			el.setAttribute(k, attrs[k]);
		return el;
	}

	function buildFretboard(fretboardWidth, fretboardHeight) {
		var svg = $('<svg xmlns="http://www.w3.org/2000/svg" version="1.1"' +
			'width="' + fretboardWidth + '" height="' + fretboardHeight + '"></svg>').get(0);

		// Nut
		var nutWidth = 20;
		var nut = makeSVG('line', { 
			x1: 10, y1: 0, x2: 10, y2: fretboardHeight, stroke: 'rgb(0, 0, 0)', 'stroke-width': 20 
		});
		svg.appendChild(nut);

		// Frets
		var fretWidth = 10;
		for (var i = 1; i < 15; ++i) {
			var x = 0.5 * nutWidth + (fretboardWidth - fretWidth) / 14 * i;
			var fret = makeSVG('line', {
				x1: x, y1: 0, x2: x, y2: fretboardHeight, stroke: 'rgb(0, 0, 0)', 'stroke-width': fretWidth
			});
			svg.appendChild(fret);
		}

		// Strings
		var stringWidth = 4;
		for (var i = 0; i < 6; ++i) {
			var y = 0.5 * stringWidth + (fretboardHeight - stringWidth) / 5 * i;
			var string = makeSVG('line', { 
				x1: 0, y1: y, x2: fretboardWidth, y2: y, stroke: 'rgb(150, 150, 150)', 'stroke-width': stringWidth
			});
			svg.appendChild(string);
		}

		$('body').append(svg);
	}

	function showDots() {
		
	}

	$(document).ready(function() {
		buildFretboard(1000, 300);
		showDots();
	});

})();