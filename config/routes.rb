Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  post '/conversations/' => 'conversations#create_or_join'
  delete '/conversations' => 'conversations#delete'
  get '/conversations/:convo_id/messages/' => 'messages#index'
  post '/conversations/:convo_id/messages/' => 'messages#create'

  resources :messages, only: [:create]
end
