Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace 'api' do
    resources :contacts
    get '/history/:id', to: 'contacts#history'
  end
end
