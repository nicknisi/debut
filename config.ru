$:.unshift File.dirname(__FILE__), File.join(File.dirname(__FILE__), 'lib')

require 'rubygems'
require 'sinatra'
require 'sass'
require 'debut'

run Debut::Application;
