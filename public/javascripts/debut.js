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
	
	// Slide Model
	window.Slide = Backbone.Model.extend({
		defaults : {
			name : 'sample-slide',
			title : "Sample Title",
			content : ""
		},
		initialize : function (attributes) {
			console.log('new slide initialized');
			Backbone.Model.prototype.initialize.call(this, attributes);
		}
	});

	// Slide View
	window.SlideView = Backbone.View.extend({
		events : {
			'keypress' : "doKeyPress",
			'click' : "doKeyPress"
		},
		initialize : function () {
			_.bindAll(this, 'render');
			this.template = _.template($('#slide-template').html());
		},
		render : function () {
			var renderedContent = this.template(this.model.toJSON());
			$(this.el).html(renderedContent);
			return this;
		},
		doKeyPress : function (event) {
			console.log('key pressed');
		}
	});

	window.SlideCollection = Backbone.Collection.extend({
		model : Slide,
		url : '/slides'
	});
	
	window.Player = Backbone.Model.extend({
		defaults : {
			index : 0
		},
		initialize : function () {
			this.currSlide = new Slide();
			this.slides = new SlideCollection();
			this.slides.fetch();
		}
	});

	window.Router = Backbone.Router.extend({
		routes : {
			"" : "home",
			"/foo" : "foo",
			"/slide/:name" : "slide"
		},
		initialize : function () {
			this.deck = new SlideCollection();
			this.deck.fetch();
		},
		home : function () {
			this.navigate('/slide/0', true);
		},
		foo : function () {
			console.log("You got to foo!");
		},
		slide : function (name) {
			var self = this;
			setTimeout(function () {
				var model = self.deck.at(0);
				var view = new SlideView({
					model : model
				});
				$('#main-container').append(view.render().el);
			}, 2000);
		}
	});

})(jQuery, window);
