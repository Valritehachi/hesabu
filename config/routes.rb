Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root to: 'hesabu#index'
  get '/index', to: 'hesabu#index'
  get '/login', to: 'hesabu#login'
  get '/instructions', to: 'hesabu#instructions'
  get '/start', to: 'hesabu#start'
  get '/signup', to: 'hesabu#signup'
  get '/settings', to: 'hesabu#settings'
  get '/gameinstructions', to: 'hesabu#gameinstructions'
  get '/feedback', to: 'hesabu#feedback'
  get '/reportbug', to: 'hesabu#reportbug'

end
