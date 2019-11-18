class ApplicationController < ActionController::API
  include ActionController::MimeResponds
end

class Api::FollowersController < ApplicationController

  #GET all followers(/api/followers) 
  def index
    @followers = Follower.all

    render json: @followers
  end

  #Get a specific follower (/api/follower/id)
  def show
    @followers = Follower.find(params[:id])
    
    render json: @followers
  end

  #Get all followers for a current user (/api/userfollowers)
  def followers 
    @arrfollowers_id = Follower.where(user_id: @current_user.id)
    #render json: @arrfollowers_id
    @userId = @current_user.id
    render json: Follower.joins("LEFT OUTER JOIN users on followers.user_id = #{@userId}")
    .select("users.*,0 as currentuser,0 as followed").where("users.id = followers.followeduser_id")
    #User.where(id: Follower.where(followeduser_id:  @userId).pluck(:user_id))
  end
 
 
  #Get all users followed by the current user (/api/following)
  def following
    render json: @current_user.followers
  end


  #follow a user (/api/follow/id) 
  def follow
    @follower = Follower.new(follower_params) 
    @follower.user = @current_user  #get current logged in user

    respond_to do |format|
      if @follower.save
         format.json{ render :json => @follower ,status: 200 }  #returns the created publication in json
      else
         format.json { render json: @follower.errors, status: 404 }  #returns error publication in json
     end
    end  
  end

  private

  #white list params
  def follower_params
    params.fetch(:user,{}).permit(:followeduser_id)
  end

end 