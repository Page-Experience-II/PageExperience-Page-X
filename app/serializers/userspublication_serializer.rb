class UserspublicationSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id,:publication_text,:publication_img,:publication_vid,:publication_subject,:post, :user_id, :created_at, :updated_at, :first_name, :last_name, 
  :avatar, :likes, :promote, :access, :publication_type, :work_type, :liked, :promoted, :currentuser

  def avatar
    if object.user.avatar.attached?
      #variant = object.post.variant(resize: "100x100")
      return rails_blob_path(object.user.avatar, only_path: true)  
    end
  end
  
  def post
    if object.post.attached?
      #variant = object.post.variant(resize: "10x10")
      return rails_blob_path(object.post, only_path: true)  
    end
  end

end 
