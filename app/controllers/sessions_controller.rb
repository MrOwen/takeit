class SessionsController < ApplicationController
	def create
		user = User.from_omniauth(env["omniauth.auth"])
		session[:user_id] = user.id
		redirect_to calendar_url
	end

	def destroy
		session[:user_id] = nil
		redirect_to login_url
	end
end