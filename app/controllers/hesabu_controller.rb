class HesabuController < ApplicationController

    layout "hesabu"
    def initialize
        super
        @current_page = 'home'
        @left_nav = {
            "home" => {
                "title" => "Home",
                "path" => "/"
            },
            "gameinstructions" => {
                "title" => "Instructions",
                "path" => "/gameinstructions"
            }
        }
        @right_nav = {
            "login" => {
                "title" => "Login",
                "path" => "/login"
            },
            "signup" => {
                "title" => "Sign Up",
                "path" => "/signup"
            },
            "profile" => {
                "title" => "Profile",
                "path" => "/profile"
            }
        }
    end


    
    def index
    end

    def login
        @current_page = 'login'
    end

    def instructions 
        @current_page = 'instructions'
    end
    
    def start
        @current_page = 'start'
    end

    def signup
        @current_page = 'signup'
    end

    def settings
    end

    def gameinstructions
        @current_page = 'gameinstructions'
    end

    def feedback
    end

    def reportbug
    end

    def profile
        @current_page = 'profile'
    end
    
    def login_user
        user_params = params.require(:user).permit!
        user = User.where(email: user_params['email']).first
        unless user.present?
            flash[:error] = "User does not exist."
            return redirect_to  '/login'
        end

        unless user.valid_password?(user_params['password'])
            flash[:error] = "incorrect password."
            return redirect_to  '/login'
        end

        sign_in(:user, user)
        unless user_signed_in?
            flash[:error] = "user not signed in."
            return redirect_to  '/login'
        end

        redirect_to '/instructions'

    end

    def players = []
        (1..5).each do |player_number|
        player_name = params["playerName#{player_number}"]
        player_age = params["playerAge#{player_number}"]
        
        if player_name.present?
            players << { name: player_name, age: player_age, }
        end
    end
end


