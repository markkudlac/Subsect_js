Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  resources :appzips

  devise_for :users
  resources :servers

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".


  
  # You can have the root of your site routed with "root"
  
  #constraints off for subdomain for testing but should go in for "/app"
  get 'pkg/:pkgname/*pkgargs', to: 'webrtc#client'
  get 'pkg/:pkgname', to: 'webrtc#client'
  get 'pkg/', to: 'webrtc#client'
  
  get "/api/getrtcid/:subname", to: "api#getrtcid"
  get "/api/setrtcid/:subname/:passwd/:rtcid", to: "api#setrtcid"
  get "/api/hostavailable/:subname", to: "api#hostavailable"
  get "/api/hostsubmit/:subname/:passwd", to: "api#hostsubmit"
  get "/api/offline/:subname/:passwd", to: "api#offline"
  get "/api/control/:subname/:passwd", to: "api#control"
  get "/api/serve/:id", to: "appzips#serve"
  get "/api/listapps", to: "appzips#listapps"
  
  get "/", to: 'webrtc#client', constraints: 
      lambda { |r| r.subdomain.present? && r.subdomain != 'www' }
      
  get "/test", to: "static#test"
  get "/bazaar", to: "appzips#bazaar"
  
  get "/fucked", to: "devise/webrtc#client" #stupid but needed for current_page? and devise
  get "/shithead", to: "devise/static#home" #stupid but needed for current_page? and devise
  
  root 'static#home'
  
end
