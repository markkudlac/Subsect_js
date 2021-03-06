# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path
# Add Yarn node_modules folder to the asset load path.
Rails.application.config.assets.paths << Rails.root.join('node_modules')

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# folder are already added.
# Rails.application.config.assets.precompile += %w( admin.js admin.css )

#This was added by Mark to handle addition of conditional css/js
Rails.application.config.assets.precompile += %w( subsect.js )
#Rails.application.config.assets.precompile += %w( peer.0.3.13.js )
Rails.application.config.assets.precompile += %w( peer16na.js )
Rails.application.config.assets.precompile += %w( adapter_no_edge.js )

