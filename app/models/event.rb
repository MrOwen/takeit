class Event < ActiveRecord::Base
  attr_accessible :start_datetime, :end_datetime, :poster, :taken_datetime, :taker, :poster

  belongs_to :poster, class_name: 'User', foreign_key: 'poster'
  belongs_to :taker, class_name: 'User', foreign_key: 'taker'
end
