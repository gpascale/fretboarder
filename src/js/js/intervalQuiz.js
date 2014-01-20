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