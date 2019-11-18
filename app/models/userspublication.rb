class Userspublication < ApplicationRecord

belongs_to :user

has_one_attached :post
validates :user_id, presence: true

end