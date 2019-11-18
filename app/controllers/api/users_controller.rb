include ActionController::Serialization

class ApplicationController < ActionController::API
  include ActionController::MimeResponds
end

class Api::UsersController < ApplicationController

  skip_before_action :authenticate_request, raise: false, :only => [:create]
  #Get all users (/api/users)
  def index 
    @userId = @current_user.id
    @users = User.joins("LEFT OUTER JOIN followers ON followers.user_id=users.id")
    .select("users.*,case when #{@userId}=users.id then 1 ELSE 0 end as currentuser
    ,case when #{@userId}=followers.user_id then 0 else 0 end as followed")
    .paginate(page: params[:page], per_page: 10)

    render json: @users
  end
  

  #Get a specific user (/api/user) 
  def show
    #@user = User.find(params[:id])
    @userId = @current_user.id
    @user = User.joins("LEFT OUTER JOIN followers ON followers.user_id=users.id")
    .select("users.*,case when #{@userId}=users.id then 1 ELSE 0 end as currentuser
    ,case when #{@userId}=followers.user_id then 0 else 0 end as followed")
    .where("users.id = #{@userId}")
    render json:  @user
  end


  #Get other user (/api/otheruser/:id) 
  def otheruser
    @userId = @current_user.id
    @user = User.joins("LEFT OUTER JOIN followers ON followers.followeduser_id=users.id and #{@userId}=followers.user_id")
    .select("users.*,Case when #{params[:id]}=users.id Then 0 Else 0 end as currentuser
    ,Case when #{@userId}=followers.user_id Then 1 Else 0 end as followed")
    .where("users.id = #{params[:id]}")
    render json:  @user
  end
  

  #(post) create users (/api/signup)
  def create
    @user = User.new(user_params)
 
      if @user.save
        #@user.avatar.attach(params[:avatar])
        render plain: { status: 200, msg: 'Successful' }.to_json, content_type: 'application/json'
      else 
         render plain: { status: 404, msg: 'Signup Error' }.to_json, content_type: 'application/json'
     end
  end


  #(post) create users (/api/userupdate)
  def updateuser
    @user = @current_user

    @user.update(first_name: params[:first_name]) if !params[:first_name].nil?
    @user.update(last_name: params[:last_name]) if !params[:last_name].nil?
    @user.update(email: params[:email]) if !params[:email].nil? 
    @user.update(phone: params[:phone]) if !params[:phone].nil?
    @user.update(school: params[:school]) if !params[:school].nil?
    @user.update(location: params[:location]) if !params[:location].nil?
    @user.update(profession: params[:profession]) if !params[:profession].nil?
    @user.update(dob: params[:dob]) if !params[:dob].nil?
    @user.update(bio: params[:bio]) if !params[:bio].nil?
    @user.avatar.attach(params[:avatar]) if !params[:avatar].nil?
    @user.coverpic.attach(params[:coverpic]) if !params[:coverpic].nil?

    if @user.save
      render plain: { msg: 'Sucessful' }.to_json, content_type: 'application/json'
    else 
      render plain: { msg: 'Failed' }.to_json, content_type: 'application/json'
    end
  end


  def upload_avatar #(api/profilepic)
    @current_user.avatar.attach(params[:avatar])
    render plain: { status: 200,msg: 'Sucessful' }.to_json, content_type: 'application/json'
  end


  def upload_coverpic #(api/coverpicpic)
    @current_user.coverpic.attach(params[:coverpic])
    render plain: { status: 200,msg: 'Sucessful' }.to_json, content_type: 'application/json'
  end


  def search
    search = params[:search] || nil
    @userId = 1
    @users = User.joins("LEFT OUTER JOIN followers ON followers.followeduser_id=users.id and #{@userId}=followers.user_id")
    .select("users.*,Case when #{@userId}=users.id Then 1 Else 0 end as currentuser
    ,Case when #{@userId}=followers.followeduser_id Then 0 Else 0 end as followed").where('first_name ILIKE ? ', "%#{search}%")
    .paginate(page: params[:page], per_page: 10) if search
    render json: @users
  end

  def influencers
    @userId = @current_user.id
    @users = User.joins("LEFT OUTER JOIN followers ON followers.user_id=users.id")
    .select("distinct users.*,case when #{@userId}=users.id then 1 ELSE 0 end as currentuser
    ,case when #{@userId}=followers.user_id then 0 else 0 end as followed")
    .paginate(page: params[:page], per_page: 10)

    render json: @users
  end
 
  private
  #whitelist parameters and permit them through hash params 
  def user_params
    params.fetch(:user,{}).permit(:first_name, :last_name, :email, :phone, :password, :profession, :school, :location, :avatar, :page, :dob, :coverpic, :bio)
  end

end