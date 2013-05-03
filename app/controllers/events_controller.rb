class EventsController < ApplicationController
	#load_and_authorize_resource
	respond_to :json, :html

	def calendar
	end

	# GET /events/new.json
	# def new
	# 	@event = Event.new(params[:event])

	# 	respond_to do |format|
	# 		format.json { render json: @event }
	# 	end
	# end

	# POST /events.json
	def create
		params[:event][:poster] = User.find_by_email(params[:event][:poster])
		@event = Event.new(params[:event])

		respond_to do |format|
			if @event.save
				format.json { render json: @event, status: :created, location: @event }
			else
				format.json { render json: @event.errors, status: :unprocessable_entity }
			end
		end
	end

	# PUT /events/1.json
	def update
		params[:event][:taker] = User.find_by_email(params[:event][:taker])
		@event = Event.find(params[:id])

		respond_to do |format|
			if @event.update_attributes(params[:event])
				format.json { head :no_content }
			else
				format.json { render json: @event.errors, status: :unprocessable_entity }
			end
		end
	end
end
