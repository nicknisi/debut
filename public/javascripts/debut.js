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
	var SlideView = Backbone.View.extend({
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
		doKeyPress : function () {
			console.log('key pressed');
		}
	});

	var SlideCollection = Backbone.Collection.extend({
		model : Slide,
		url : '/slides'
	});

	var Router = Backbone.Router.extend({
		routes : {
			"" : "home",
			"/foo" : "foo",
			"/slide/:name" : "slide"
		},
		home : function () {
			this.navigate('/slide/0', true);
		},
		foo : function () {
			console.log("You got to foo!");
		},
		slide : function (name) {
			var deck = new SlideCollection();
			deck.fetch();
			setTimeout(function () {
				var model = deck.at(0);
				var view = new SlideView({
					model : model
				});
				$('body').append(view.render().el);
			}, 2000);
		}
	});

	// publicly available methods
	return {
		Slide : Slide,
		SlideView : SlideView,
		Router : Router,
		SlideCollection : SlideCollection
	};

})(jQuery, window);
