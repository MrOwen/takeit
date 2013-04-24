class Event < ActiveRecord::Base
  attr_accessible :start_datetime, :end_datetime, :poster, :taker, :taken_datetime

  belongs_to :poster, class_name: 'User', foreign_key: 'poster'
  belongs_to :taker, class_name: 'User', foreign_key: 'taker'
end
