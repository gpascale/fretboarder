(function() {

	var app = window.FRETBOARDER = window.FRETBOARDER || { };

	var _selectedKey = 0;
	var _selectedDegrees = [ 0 ];

	$(document).ready(function() {
		var fretboard = new app.FretboardView({ width: 800, height: 240 });
		fretboard.render();
		$('#fretboardContainer').append(fretboard.$el);
		fretboard.showDots(0, [ 0 ]);

		var keysDropdown = new app.DropdownView({ 
			values: [ 'E', 'F', 'F# / Gb', 'G', 'G#/ Ab', 'A', 'A# / Bb', 'B', 'C', 'C# / Db', 'D', 'D# / Eb' ] 
		});
		keysDropdown.render();
		$('#content').append(keysDropdown.$el);
		keysDropdown.on('selectionChanged', function(key) {
			_selectedKey = key;
			fretboard.showDots(_selectedKey, _selectedDegrees);
		});

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
		$('#content').append(degreesDropdown.$el);
		degreesDropdown.on('selectionChanged', function(degrees) {
			_selectedDegrees = degrees;
			fretboard.showDots(_selectedKey, _selectedDegrees);
		});
	});

})();