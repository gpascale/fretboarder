(function() {

	var app = window.FRETBOARDER = window.FRETBOARDER || { };

	app.DropdownView = Backbone.View.extend({
        template: _.template($("#dropdownTemplate").html()),
        className: 'dropdownView',

        _options: null,
        _data: null,

        initialize: function(options) {
        	this._options = options;
        },

        render: function() {
        	var self = this;
                var data = this._options ? this._options.data : null;
        	this.$el.html(this.template());
        	if (this._options && this._options.values) {
        		for (var i = 0; i < this._options.values.length; ++i) {
        			this.$('.dropdown-menu').append('<li><a href="#">' + this._options.values[i] + '</a></li>');
        		}
                        this.$('.selected').html(this._options.values[0]);
                        this.$('.selected').text(this._options.values[0]);
        	}
        	this.$el.on('click', 'li a', function() {
        		self.$('.selected').html($(this).html());
        		self.$('.selected').text($(this).html());
                        var index = $(this).parent().index();
                        var dataVal = data ? data[index] : index;
        		self.trigger('selectionChanged', dataVal);
        	});
        },

        remove: function() {

        }
	});

}());