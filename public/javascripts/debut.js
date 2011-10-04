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
			name : '',
			title : "",
			content : "",
			type : ""
		},
		initialize : function (attributes) {
			// if content exists, generate html from markdown
			if (attributes.hasOwnProperty('content')) {
				console.log('running showdown');
				this.set({
					content : converter.makeHtml(attributes.content)
				});
			}
			console.info('new slide initialized');
			Backbone.Model.prototype.initialize.call(this, attributes);
		}
	});

	window.SlideCollection = Backbone.Collection.extend({
		model : Slide,
		url : '/slides'
	});

	window.Deck = Backbone.Model.extend({
		defaults : {
			slideIndex : 0
		},
		initialize : function (attrs) {
			console.info('initializing new debut model');
			var self = this;
			self.deck = new SlideCollection();
			self.length = 0;
			// self.deck.bind('change', self.loadSlide, self);
		},
		update : function () {
			var self = this;
			self.reset();
			self.deck.fetch({
				success : function () {
					self.length = self.deck.length;
					self.trigger('ready');
				},
				error : function () {
					console.error('error fetching slide data from server');
				}
			});
		},
		reset : function () {
			this.set({ slideIndex : 0 });
		},
		getIndex : function () {
			return this.get('slideIndex');
		},
		getLength : function () {
			return this.length;
		},
		isValidIndex : function (index) {
			return (index > -1 && index < this.length);
		},
		goToSlide : function (idx) {
			var self = this;
			if (self.isValidIndex(idx)) {
				self.set({ slideIndex : idx });
				self.loadSlide();
			}
			else {
				console.warn("entered invalid slide index: " + idx + ' ' + self.length);
			}
		},
		loadSlide : function () {
			console.info('load slide called');
			var slide = this.deck.at(this.get('slideIndex'));
			var view = new SlideView({
				model : slide
			});
			view.render();
		},
		prevSlide : function () {
			var idx = this.get('slideIndex');
			if (idx !== 0) {
				this.set({ slideIndex : --idx });
				this.loadSlide();
			}
		},
		nextSlide : function () {
			var idx = this.get('slideIndex');
			if (idx !== this.length - 1) {
				this.set({slideIndex : ++idx });
				this.loadSlide();
			}
		}
	});

	// when the dom is ready, create the views
	$(function () {
		// Slide View
		window.SlideView = Backbone.View.extend({
			tagName : "section",
			className : "slide",
			events : {

			},
			initialize : function () {
				_.bindAll(this, 'render');
				this.template = _.template($('#slide-template').html());
			},
			render : function () {
				var renderedContent = this.template(this.model.toJSON());
				$(this.el).html(renderedContent);
				$('#main-container').empty().append(this.el);
				return this;
			}
		});

		var LoadingView = Backbone.View.extend({
			tagName : 'div',
			className : 'fullscreen',
			initialize : function () {
				_.bindAll(this, 'render');
				this.template = _.template($('#loading-template').html());
			},
			render : function () {
				var renderedContent = this.template({});
				$(this.el).html(renderedContent);
				$('#main-container').empty().append(this.el);
				return this;
			}
		});

		window.Router = Backbone.Router.extend({
			routes : {
				'' : 'home',
				'/slide/:num' : 'slide'
			},
			initialize : function () {
				var self = this;
				self.deck = new Deck();
				self.deck.bind('ready', function () {
					self.navigate('/slide/0', true);
				});
				self.deck.update();
			},
			home : function () {
				new LoadingView().render();
			},
			slide : function (num) {
				var self = this;
				self.deck.goToSlide(num);
			},
			prevSlide : function () {
				var idx = parseInt(this.deck.getIndex()) - 1;
				if (this.deck.isValidIndex(idx)) {
					this.navigate('/slide/' + idx, true);
				}
			},
			nextSlide : function () {
				var idx = parseInt(this.deck.getIndex()) + 1;
				if (this.deck.isValidIndex(idx)) {
					this.navigate('/slide/' + idx, true);
				}
			}
		});

	});

})(jQuery, window);