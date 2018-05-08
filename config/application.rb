require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Subsect
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    
    ActionMailer::Base.smtp_settings = {
      :port           => ENV['MAILGUN_SMTP_PORT'], 
      :address        => ENV['MAILGUN_SMTP_SERVER'],
      :user_name      => ENV['MAILGUN_SMTP_LOGIN'],
      :password       => ENV['MAILGUN_SMTP_PASSWORD'],     
      :domain         => 'subsect.herokuapp.com',
      :authentication => :plain
    }
    ActionMailer::Base.delivery_method = :smtp
  end
end
