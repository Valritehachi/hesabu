class ProfilesController < ApplicationController

    def create
        user_fields = params.require(:user).permit!
        unless user_fields.present?
            flash[:error] = "Something went wrong. Please try again."
            return redirect_to  '/signup'
        end

        Rails.logger.debug "User Fields #{user_fields}"
        user = User.where(email: user_fields['email'].downcase).first
        if user.present?
            flash[:error] = "user already exists."
            return redirect_to  '/signup'
        end

        user = User.create(user_fields)
        unless user.valid?
            flash[:error] = "Error creating user: #{user.errors.to_s}."
            return redirect_to  '/signup'
        end

        player_data = params["players"] #require(:player"s).permit!
        if player_data.present?
            player_data.each do |data|
                player_fields = data.permit!
                Rails.logger("PLAYER: #{player_fields}")
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
