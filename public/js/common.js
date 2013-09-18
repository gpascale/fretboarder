(function() {

	var app = window.FRETBOARDER = window.FRETBOARDER || { };
	var common = app.common = app.common || { };

	common.randInt = function(min, max) {
		return Math.floor(min + Math.random() * (max - min + 1));
	}

	common.offsets = [24, 19, 15, 10, 5, 0];
	common.relativeOffsets = [5, 4, 5, 5, 5, 0];

}());