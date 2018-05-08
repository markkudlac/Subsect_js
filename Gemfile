source 'https://rubygems.org'


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.1.4'

# Use SCSS for stylesheets
gem 'sass-rails', '>= 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 4.1.10'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '>= 4.2.2'

# Use jquery as the JavaScript library
gem 'jquery-rails'
# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '>= 2.7.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '>= 1.0.0', group: :doc

#handle null origin for ios
gem 'rack-cors'

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

gem 'devise', '>= 4.4.3'
gem 'exception_notification', "4.1.0.rc1"

group :production do
  gem 'rails_12factor'  # This is for Heroku Rails 4
  gem 'pg'    # Use postgress as the database for Active Record
end

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'
  
  gem 'listen'

  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '>= 2.0'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'sqlite3'
#  gem 'heroku'
  gem 'letter_opener', "~> 1.0.0"    # This is for mail delivery to browser for testing
end

ruby "2.4.1"
