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
			}
		});

		app.showFreeplay();
	});

})();