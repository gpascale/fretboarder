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