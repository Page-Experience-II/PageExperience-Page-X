class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id,:first_name, :last_name, :email, :phone, :last_login, :school, :location, :profession, 
  :updated_at, :dob, :currentuser, :bio, :followed, :avatar, :coverpic

  def avatar
    if object.avatar.attached?
      variant = object.avatar.variant(resize: "100x100")
      return rails_blob_url(object.avatar, only_path: true) 
    end
  end

  def coverpic
    if object.coverpic.attached?
      variant = object.coverpic.variant(resize: "100x100")
      return rails_blob_url(object.coverpic, only_path: true) 
    end
  end

end
