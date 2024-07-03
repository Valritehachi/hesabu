Rails.application.routes.draw do
  devise_for :users
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root to: 'hesabu#index'
  get '/index', to: 'hesabu#index'
  get '/login', to: 'hesabu#login'
  post '/login', to: 'hesabu#login_user'
  get '/instructions', to: 'hesabu#instructions'
  get '/start', to: 'games#start'
  get '/signup', to: 'hesabu#signup'
  get '/settings', to: 'hesabu#settings'
  get '/about', to: 'hesabu#about'
  get '/gameinstructions', to: 'hesabu#gameinstructions'
  get '/feedback', to: 'hesabu#feedback'
  get '/reportbug', to: 'hesabu#reportbug'
  get '/profile', to: 'hesabu#profile'
  get '/games', to: 'games#index'
  get '/games/mads/:type', to: 'games#mads'

  resources :profiles
end
