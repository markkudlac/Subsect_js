class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  
  has_many :appzip, dependent: :destroy
  
  if Rails.env.development? || ENV['ADMIN_SUBSECT'] == "registerable" then
    devise :registerable
  end
  
  devise :database_authenticatable,
         :recoverable, :rememberable, :trackable, :validatable
end
