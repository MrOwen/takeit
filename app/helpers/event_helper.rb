module EventHelper
	require 'date'
	# end_date is for future use if more or less than a 2 week span needs to be calculated
	#For now, it's not used, so it can just be set to nil by default
	def json_days_shifts(start_date, end_date = nil)
		setup = {}
		days_array = []
		shifts_array = {}
		curr_date = start_date - start_date.wday
		next_week = curr_date.next_day(13)
		while curr_date <= next_week do
			days_array << curr_date.to_s

			shifts_array[curr_date.to_s] = []
			#This is a bit of a tricky query to select the shifts on the iterator's current date
			#Determine the current iterator date and see if there are any matches in the DB whose start date
			# is between the current date at time 00:00 and the day after at 00:00
			Event.where(:start_datetime => (curr_date.to_datetime.to_s)..(curr_date.next.to_datetime.to_s)).each do |e|
				shifts_array[curr_date.to_s] << {
					start_date: e.start_datetime,
					end_date: e.end_datetime,
					date_taken: e.taken_datetime,
					poster: e.poster.name,
					taker: e.taker.name
				}
			end

			#Add a day to the current iterator date
			curr_date = curr_date.next
		end
		setup[:shifts] = shifts_array
		setup[:calendar_days] = days_array
		setup.to_json.html_safe
	end
end