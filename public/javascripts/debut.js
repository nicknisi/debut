/**
 * Debut
 * JavaScript Presentation Framework
 * Author: Nick Nisi
 * Dependencies:
 *	jQuery
 *	Underscore
 *	Backbone
 **/

(function ($, window, undefined) {

	window.converter = new Showdown.converter();
	
	// Slide Model
	window.Slide = Backbone.Model.extend({
		defaults : {
			name : 'sample-slide',
			title : "Sample Title",
			content : "",
			type : "string"
		},
		initialize : function (attributes) {
			console.log('new slide initialized');
			Backbone.Model.prototype.initialize.call(this, attributes);
		}
	});

	// Slide View
	window.SlideView = Backbone.View.extend({
		events : {},
		initialize : function () {
			_.bindAll(this, 'render');
			this.template = _.template($('#slide-template').html());
		},
		render : function () {
			var renderedContent = this.template(this.model.toJSON());
			$(this.el).html(renderedContent);
			return this;
		}
	});
	
	window.SlideCollection = Backbone.Collection.extend({
		model : Slide,
		url : '/slides'
	});

	window.Debut = Backbone.Model.extend({
		defaults : {
			slideIndex : 0
		},
		initialize : function (attrs) {
			this.deck = new SlideCollection();
			this.deck.fetch();
		},
		reset : function () {
			this.set({ slideIndex : 0 });
		},
		prevSlide : function () {},
		nextSlide : function () {}
	});

})(jQuery, window);
