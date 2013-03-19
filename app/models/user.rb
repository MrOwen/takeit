class User < ActiveRecord::Base
  attr_accessible :email, :name, :role

  has_many :events, foreign_key: 'poster'
  has_many :events_taken, class_name: 'Event', foreign_key: 'taker'
end
