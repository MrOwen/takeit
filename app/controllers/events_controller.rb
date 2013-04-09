class EventsController < ApplicationController
	respond_to :json, :html
	def calendar
		render 'calendar'
	end

	def data
		render 'index'
	end
end
