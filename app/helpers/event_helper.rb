module EventHelper
	require 'date'
	# end_date is for future use if more or less than a 2 week span needs to be calculated
	#For now, it's not used, so it can just be set to nil by default
	def json_event_builder(start_date, end_date = nil)
		setup = {}
		shifts_array = {}
		curr_date = start_date - start_date.wday
		next_week = curr_date.next_day(13)
		days_array = (curr_date..next_week).to_a
		Event.where(:start_datetime => (curr_date.to_datetime.to_s)..(next_week.next.to_datetime.to_s)).each do |e|
			curr_date = Date.rfc3339(e.start_datetime).to_s
			# If the current event's date isn't an element in the shifts array, we create and populate it
			(shifts_array[curr_date].nil? ? shifts_array[curr_date] = [] : shifts_array[curr_date]) << {
				shift_id: e.id,
				start_date: e.start_datetime,
				end_date: e.end_datetime,
				date_taken: e.taken_datetime,
				date_posted: e.created_at,
				poster: e.poster.nil? ? nil : e.poster.name,
				taker: e.taker.nil? ? nil : e.taker.name
			}
		end
		setup[:shifts] = shifts_array
		setup[:calendar_days] = days_array
		setup[:user_data] = {
			name: current_user.name,
			email: current_user.email
		}
		setup.to_json.html_safe
	end
end