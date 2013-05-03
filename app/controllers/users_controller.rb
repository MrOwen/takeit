class UsersController < ApplicationController
    #load_and_authorize_resource
    respond_to :json, :html

	def index
	end

    def login
    end

    # PUT /users/1.json
    def update
        @user = User.find(params[:id])

        respond_to do |format|
            if @user.update_attributes(params[:user])
                format.json { head :no_content }
            else
                format.json { render json: @user.errors, status: :unprocessable_entity }
            end
        end
    end
end