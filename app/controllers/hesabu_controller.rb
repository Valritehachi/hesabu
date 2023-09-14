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
    end
end
