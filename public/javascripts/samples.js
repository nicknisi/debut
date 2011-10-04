var s = (function ($, window, undefined) {
	// namespace to save to
	var s = {};
	
	s.Book = Backbone.Model.extend({
		defaults : {
			title : "Linux Kernel Development",
			author : "Robert Love",
			pages : 440,
			currPage : 1
		},
		intialize : function (attributes) {
			console.log('new Book initialized: ' + this.get('title'));
		},
		goToPage : function (page) {
			if (page > 0 && page <= this.get('pages')) {
				this.set({
					currPage : page
				});
			}
			else {
				console.info("that page does not exist");
			}
		}
	});
	
	s.BookView = Backbone.View.extend({
		initialize : function () {
			_.bindAll(this, 'render');
			this.template = _.template($('#book-template').html());
			this.model.bind('change', this.render);
		},
		render : function () {
			var renderedContent = this.template(this.model.toJSON());
			$(this.el).html(renderedContent);
			return this;
		}
	});
	
	s.BookCollection = Backbone.Collection.extend({
		model : s.Book
	});
	
	s.Router = Backbone.Router.extend({
		routes : {
			'' : 'home',
			'/foo/:bar' : 'foo'
		},
		initialize : function () {
			console.log('router initialized')
		},
		home : function () {
			console.log('at home route');
		},
		foo : function (bar) {
			console.log('at route foo:' + bar);
		}
	});
	
	window.empty = function () {
		$('#test-area').empty();
	};
	
	return s;
})(jQuery, window);