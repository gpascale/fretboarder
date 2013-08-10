(function() {

	var app = window.FRETBOARDER = window.FRETBOARDER || { };

	$(document).ready(function() {
		var fretboard = new app.FretboardView({ width: 800, height: 240 });
		fretboard.render();
		$('body').append(fretboard.$el);
		setTimeout(function() { fretboard.showDots(); }, 2000);
	});

})();