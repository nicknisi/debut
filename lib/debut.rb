# Debut
# Simple JavaScript/Backbone HTML5 Slide show
# Author: Nick Nisi

module Debut
	class Application < Sinatra::Base

		get '/' do
			redirect 'public/index.html'
		end

		get '/stylesheets/debut.css' do
			scss :'scss/debut'
		end

	end
end
