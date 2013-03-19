class Event < ActiveRecord::Base
  attr_accessible :datetime, :poster, :taken_datetime, :taker

  belongs_to :poster, class_name: 'User', foreign_key: 'poster'
  belongs_to :taker, class_name: 'User', foreign_key: 'taker'
end
