class Api::LikesandpromotesController < ApplicationController

  def likedby
    @userId = @current_user.id
    @likesandpromotes = Likesandpromote.joins('Left outer join users on users.id = likesandpromotes.likeduser_id')
      .select("users.*,case when #{@userId}=users.id then 1 Else 0 end as currentuser").where(userspublication_id: params[:id])
    render json: @likesandpromotes
  end

  def promotedby
    @userId = @current_user.id
    @likesandpromotes = Likesandpromote.joins('Left outer join users on users.id = likesandpromotes.promoteduser_id')
      .select("users.*,Case when #{@userId}=users.id then 1 else 0 end as currentuser").where(userspublication_id: params[:id])
    render json: @likesandpromotes
  end

end