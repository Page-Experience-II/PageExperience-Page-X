include ActionController::Serialization
class ApplicationController < ActionController::API
  include ActionController::MimeResponds
end

class Api::UserspublicationsController < ApplicationController

  #GET all publications(/api/userspublications) 
  def index
    @userId = @current_user.id
    #return publications of the loogedin user and publications of users the loogedin user is following in DESC order
    render json: Userspublication.joins(:user)
                        .select("distinct users.*,userspublications.*
                        ,1  as liked
                        ,1  as promoted
                        ,1  as currentuser")
                        .order(created_at: :desc)
                        .paginate(page: params[:page], per_page: 6) ,status: 200  
  end
 
  #Get a specific Publication (/api/userspublication/id)
  def show
    @userspublications = Userspublication.find(params[:id]).paginate(page: params[:page], per_page: 10)
    
    render json: @userspublications
  end
 
  #Get all publications for a specific user (/api/userpublications)
  def publications 
    #Get userId of the logged in user
    #@userId = @current_user.userspublications.pluck(:user_id).first
    @userId = @current_user.id
    #return publications of the loogedin user and publications of users the loogedin user is following in DESC order
    render json: Userspublication.joins(:user)
                 .joins("LEFT OUTER JOIN followers ON followers.user_id=users.id 
                        LEFT OUTER JOIN likesandpromotes l1 ON l1.userspublication_id = userspublications.id
                        and l1.likeduser_id = userspublications.user_id
                        LEFT OUTER JOIN likesandpromotes l2 ON l2.userspublication_id = userspublications.id
                        and l2.promoteduser_id = userspublications.user_id
                        where (followers.followeduser_id = #{@userId} or users.id = #{@userId})")
                        .select("users.*,userspublications.*
                        ,Case When l1.likeduser_id is null Then 0 Else 1 end as liked
                        ,Case When l2.promoteduser_id is null Then 0 Else 1 end as promoted
                        ,Case When #{@userId}=userspublications.user_id Then 1 Else 0 end as currentuser")
                        .order(created_at: :desc)
                        .paginate(page: params[:page], per_page: 10) ,status: 200  
  end


    #Get other user publications (/api/otheruserpublications/:id) 
  def otheruserpublications
    @userId = params[:id]
    #@userId = @userspublication.user_id

    render json: Userspublication.joins(:user)
                 .joins("LEFT OUTER JOIN followers ON followers.user_id=users.id 
                        LEFT OUTER JOIN likesandpromotes l1 ON l1.userspublication_id = userspublications.id
                        and l1.likeduser_id = userspublications.user_id
                        LEFT OUTER JOIN likesandpromotes l2 ON l2.userspublication_id = userspublications.id
                        and l2.promoteduser_id = userspublications.user_id
                        where (followers.followeduser_id = #{@userId} or users.id = #{@userId})")
                        .select("users.*,userspublications.*
                        ,Case When l1.likeduser_id is null Then 0 Else 1 end as liked
                        ,Case When l2.promoteduser_id is null Then 0 Else 1 end as promoted
                        ,Case When #{@userId}=userspublications.user_id Then 1 Else 0 end as currentuser")
                        .order(created_at: :desc)
                        .paginate(page: params[:page], per_page: 10) ,status: 200 

  end

  #publish user posts for the logged in user (/api/publish) 
  def publish
    @userspublications = Userspublication.new(userspublication_params) 
    @userspublications.user = @current_user  #get current logged in user

    #respond_to do |format|
      if @userspublications.save
         render plain: { status:200, msg: 'Successful'  }.to_json, content_type: 'application/json'
      else
        render plain: { status:404, msg: 'Failed' }.to_json, content_type: 'application/json'
     end
    #end 
  end

  #Increment count of likes by one for a post (/api/userpublication/likes/:id) 
  def like
    @userspublications = Userspublication.find(params[:id])
    @userspublications.likes += 1
    @userId = current_user.id
    @likesandpromotes = Likesandpromote.create(userspublication_id: params[:id], likeduser_id: @userId)

    if @userspublications.save
      render plain: { msg: 'Sucessful', status: 200,count: @userspublications.likes }.to_json, content_type: 'application/json'
    else
      render plain: { msg: 'Failed' }.to_json, content_type: 'application/json'
    end
  end


    #Increment count of promote by one for a post (/api/userpublication/promote/:id) 
  def promote
   @userspublications = Userspublication.find(params[:id])
   @userspublications.promote += 1
   @userId = @current_user.id
   @likesandpromotes = Likesandpromote.create(userspublication_id: params[:id], promoteduser_id: @userId)

    if @userspublications.save
      render plain: { msg: 'Sucessful', status: 200,count: @userspublications.promote }.to_json, content_type: 'application/json'
    else
      render plain: { msg: 'Failed' }.to_json, content_type: 'application/json'
    end
  end


  def search
    search = params[:search] || nil
    @userId = @current_user.id
    
    @userspublications = Userspublication.joins(:user)
    .joins("LEFT OUTER JOIN likesandpromotes l1 ON l1.userspublication_id = userspublications.id
                        and l1.likeduser_id = userspublications.user_id
                        LEFT OUTER JOIN likesandpromotes l2 ON l2.userspublication_id = userspublications.id
                        and l2.promoteduser_id = userspublications.user_id")
    .select("users.first_name,users.last_name,users.*,userspublications.*
            ,Case When l1.likeduser_id is null Then 0 Else 1 end as liked
            ,Case When l2.promoteduser_id is null Then 0 Else 1 end as promoted
            ,Case When #{@userId}=userspublications.user_id Then 1 Else 0 end as currentuser")
    .where('publication_text LIKE ? ', "%#{search}%")
    .order(created_at: :desc)
    .paginate(page: params[:page], per_page: 10) if search
    render json: @userspublications
  end
 
  private

  #white list params
  def userspublication_params
    params.permit(:publication_text, :publication_img, :publication_vid, :publication_subject,:post, :likes, :promote, :page, :publication_doc, :access, :work_type, :publication_type)
  end
    
end