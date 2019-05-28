Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  mount ActionCable.server => '/cable'
  post '/conversations/' => 'conversations#create_or_join'
  get '/conversations/:convo_id/messages/' => 'messages#index'
  post '/conversations/:convo_id/messages/' => 'messages#create'
  resources :messages, only: [:create]
end
