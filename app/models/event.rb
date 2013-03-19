class Event < ActiveRecord::Base
  attr_accessible :datetime, :poster, :taken_datetime, :taker
end
