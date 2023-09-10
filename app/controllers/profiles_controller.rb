class ProfilesController < ApplicationController

    def create
        user_fields = params.require(:user).permit!
        unless user_fields.present?
            flash[:error] = "Something went wrong. Please try again."
            redirect_to :back
        end

        Rails.logger.debug "User Fields #{user_fields}"
        user = User.where(email: user_fields['email'].downcase).first
        unless user.present?
            flash[:error] = "user already exists."
            redirect_to :back
        end

        user = User.create(user_fields)
        unless user.valid?
            flash[:error] = "Error creating user: #{user.errors.to_s}."
            redirect_to :back
        end

        player_data = params.require(:players).permit!
        if player_data.present?
            player_data.each do |player_fields|
                player = user.players.create(
                    player_fields 
                )
            end
        end

        flash[:notice] = "Created user: #{user.email} and #{user.players.count} Players"
        redirect_to '/instructions'
    end

    def update
    end

    def destroy
    end

end
