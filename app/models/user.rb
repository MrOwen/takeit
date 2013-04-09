class User < ActiveRecord::Base
  attr_accessible :role

  has_many :events, foreign_key: 'poster'
  has_many :events_taken, class_name: 'Event', foreign_key: 'taker'

  def self.from_omniauth(auth)
  	where(auth.slice("provider", "uid")).first || create_from_omniauth(auth)
  end

  def self.create_from_omniauth(auth)
  	create! do |user|
  		user.uid = auth["uid"]
  		user.name = auth["info"]["name"]
  		user.email = auth["info"]["email"]
  		user.avatar_url = auth["info"]["image"]
  		user.provider = auth["provider"]
  		user.role = "inactive"
  	end
  end
end
