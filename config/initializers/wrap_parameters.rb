# Be sure to restart your server when you modify this file.

# This file contains settings for ActionController::ParamsWrapper which
# is enabled by default.

# Enable parameter wrapping for JSON. You can disable this by setting :format to an empty array.
ActiveSupport.on_load(:action_controller) do
  wrap_parameters format: [:json]
  #define what should be accepted from input json on post
  wrap_parameters :user, include: [:first_name, :last_name, :email, :phone, :password, :avatar, :coverpic, :bio, 
                                   :profession, :publication_text, :publication_subject, :publication_img, :publication_vid, :avatar, :followeduser_id,
                                  :school, :location, :dob]
end

# To enable root element in JSON for ActiveRecord objects.
# ActiveSupport.on_load(:active_record) do
#   self.include_root_in_json = true
# end
