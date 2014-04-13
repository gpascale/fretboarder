(function() {

	var app = window.FRETBOARDER = window.FRETBOARDER || { };

	$(document).ready(function() {
		var fretboardView = app.fretboardView = new app.FretboardView({ model: new app.Fretboard(), width: 800, height: 240 });
		fretboardView.render();
		$('#fretboardContainer').append(fretboardView.$el);

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