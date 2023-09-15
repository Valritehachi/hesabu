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
                Rails.logger.debug("PLAYER: #{player_fields}")
                player = user.players.create(
                    player_fields 
                )
            end
        end

        flash[:notice] = "Created user: #{user.email} and #{user.players.count} Players"
        redirect_to '/instructions'
    end

    def update
        @user = User.find(params[:id])
        user_fields = params.require(:user).permit!

        attributes = {}
        if user_fields['email'] != @user.email
            attributes['email'] = user_fields['email']
        end
        if !user_fields['password'].nil?
            attributes['password'] = user_fields['password']
        end
        if attributes.size > 0
            @user.update(attributes)
        end

        player_data = params["players"] #require(:player"s).permit!
        if player_data.present?
            player_data.each do |data|
                player_fields = data.permit!
                player_id   = player_fields['id']
                player_name = player_fields['name']
                player_age  = player_fields['age']
                Rails.logger.debug("PLAYER: #{player_fields}")
                if player_id
                    player = @user.players.where(id: player_id).first
                    if player_name&.length > 0 
                        player.update(
                            name: player_name,
                            age: player_age.to_i
                        )
                    end
                else 
                    player = user.players.create(
                        name: player_name,
                        age: player_age.to_i
                    )
                end
            end
        end
        flash[:notice] = "Updated Profile Successfully"
        redirect_to '/instructions'
    end

    def destroy
    end

end
