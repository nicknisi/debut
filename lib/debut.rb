# Debut
# Simple JavaScript/Backbone HTML5 Slide show
# Author: Nick Nisi

module Debut
	class Application < Sinatra::Base

		get '/' do
			# redirect '/index.html'
			File.read(File.join('public', 'index.html'))
		end

		get '/stylesheets/debut.css' do
			scss :'scss/debut'
		end

		get '/slides' do
			content_type 'application/json'
			File.read(File.join('public', 'slides.json'))
		end

	end
end
