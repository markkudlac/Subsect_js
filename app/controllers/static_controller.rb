class StaticController < ApplicationController

before_action :authenticate_user!, :only => [:test]

  def home
  end
  
  def test
     puts "Current user is #{current_user.email}"
     
    if !current_user.email.include?("gmail.com") then
      render :template => "static/home"
    end
  end
  
end