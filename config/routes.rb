Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root to: 'hesabu#index'
  get 'hesabu', to: 'hesabu#index'
  get 'hesabu/login', to: 'hesabu#login'
  get 'hesabu/instructions', to: 'hesabu#instructions'
  get 'hesabu/start', to: 'hesabu#start'
  get 'hesabu/signup', to: 'hesabu#signup'
  get 'hesabu/settings', to: 'hesabu#settings'
  get 'hesabu/gameinstructions', to: 'hesabu#gameinstructions'
  get 'hesabu/feedback', to: 'hesabu#feedback'
  get 'hesabu/reportbug', to: 'hesabu#reportbug'

end
