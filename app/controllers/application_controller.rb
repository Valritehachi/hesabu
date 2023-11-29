class ApplicationController < ActionController::Base
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
            "games" => {
                "title" => "games",
                "path" => "/Games"
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
            }
        }
    end
end
