/**
 * Debut, JavaScript Presentation Framework
 * Author: Nick Nisi
 * Dependencies:
 *	jQuery
 *	Underscore
 *	Backbone
 **/

var debut = (function ($, window, undefined) {
	
	// Slide Model
	var Slide = Backbone.Model.extend({
		defaults : {
			title : "Sample Title",
			content : "",
			subslides : undefined
		},
		initialize : function (attributes) {
			console.log('new slide initialized');
			Backbone.Model.prototype.initialize.call(this, attributes);
		}
	});

	// Slide View
	var SlideView = Backbone.View.extend({
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

	var DebutRouter = Backbone.Router.extend({
		routes : {
			"" : "home",
			"/foo" : "foo",
			"/slide/:name" : "slide"
		},
		initialize : function () {
			console.log("router initialized");
		},
		home : function () {},
		foo : function () {
			console.log("You got to foo!");
		},
		slide : function (name) {}
	});

	// publicly available methods
	return {
		Slide : Slide,
		SlideView : SlideView,
		Router : DebutRouter
	};

	// initialization
	$(function () {
		debugger;
		window.app = new DebutRouter();
		Backbone.history.start();
	});

})(jQuery, window);
