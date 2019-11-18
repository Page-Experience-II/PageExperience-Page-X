Rails.application.routes.draw do
  namespace :api do
    resources :users
    resources :userspublications
    resources :followers
    resources :likesandpromotes
    resources :worktypes
    resources :publicationtypes
    resources :accesstypes
    post 'puser', to: 'users#puser'
    get 'user', to: 'users#show'
    get 'searchusers', to: 'users#search'
    get 'searchpublications', to: 'userspublications#search'
    get 'userpublications', to: 'userspublications#publications'
    get 'userpublications/likes/:id', to: 'userspublications#like'
    get 'userpublications/promotes/:id', to: 'userspublications#promote'
    get 'updatelp', to: 'likesandpromotes#updatelp'
    post 'userupdate', to: 'users#updateuser'
    get 'userfollowers', to: 'followers#followers'
    get 'following', to: 'followers#following'
    post 'signup', to: 'users#create'
    post 'authenticate', to: 'authentication#authenticate'
    post 'publish', to: 'userspublications#publish'
    post 'profilepic', to: 'users#upload_avatar'
    post 'coverpic', to: 'users#upload_coverpic'
    post 'follow', to: 'followers#follow'
    get  'accesstypes', to: 'accesstypes#accesstypes'
    get  'worktypes', to: 'worktypes#worktypes'
    get  'likedby/:id', to: 'likesandpromotes#likedby'
    get  'promotedby/:id', to: 'likesandpromotes#promotedby'
    get 'otheruser/:id', to: 'users#otheruser' 
    get 'otheruserpublications/:id', to: 'userspublications#otheruserpublications'
    get 'influencers', to: 'users#influencers'
    #resources :professions
    # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  end
end
