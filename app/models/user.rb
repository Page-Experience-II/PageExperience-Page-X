class User < ApplicationRecord

has_many :userspublications
has_many :followers
has_many :likesandpromotes
has_one_attached :avatar
has_one_attached :coverpic
has_secure_password

end 