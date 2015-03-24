Rails.application.routes.draw do
  resources :appzips

  devise_for :users
  resources :servers

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".


  
  # You can have the root of your site routed with "root"
  
  #constraints off for subdomain for testing but should go in for "/app"
  get 'app/:appname', to: 'webrtc#client'
  get 'app/', to: 'webrtc#client'
  
  get "/api/getrtcid/:subname", to: "api#getrtcid"
  get "/api/setrtcid/:subname/:rtcid", to: "api#setrtcid"
  get "/api/serve/:id", to: "appzips#serve"
  
  get "/", to: 'webrtc#client', constraints: 
      lambda { |r| r.subdomain.present? && r.subdomain != 'www' }
      
  get "/test", to: "static#test"
  
  get "/fucked", to: "devise/webrtc#client" #stupid but needed for current_page? and devise
  root 'static#home'
  

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
