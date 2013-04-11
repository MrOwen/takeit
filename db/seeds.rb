# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
users = User.create([
	{name: "Owen Kuemerle",
	 email: "kuemerle5@hotmail.com",
	 role: "inactive",
	 provider: "google_oauth2",
	 uid: "114626536106007231347",
	 avatar_url: "https://lh3.googleusercontent.com/-usYpGykW3OI/AAAAAAAAAAI/AAAAAAAAAp8/31r7UA0jCXo/photo.jpg"},
	{name: "Owen Kuemerle",
	 email: "odkuem09@smumn.edu",
	 role: "inactive",
	 provider: "google_oauth2",
	 uid: "103986701290691546933",
	 avatar_url: "https://lh3.googleusercontent.com/-usYpGykW3OI/AAAAAAAAAAI/AAAAAAAAAp8/31r7UA0jCXo/photo.jpg"}])

shifts = Event.create([
	{poster: User.find_by_id(1),
	 taker: nil,
	 taken_datetime: nil,
	 start_datetime: '2013-04-10T07:00:00-05:00',
	 end_datetime: '2013-04-10T09:00:00-05:00'},
	{poster: User.find_by_id(2),
	 taker: User.find_by_id(1),
	 taken_datetime: '2013-02-10T013:00:00-05:00',
	 start_datetime: '2013-04-15T16:00:00-05:00',
	 end_datetime: '2013-04-15T18:00:00-05:00'}])