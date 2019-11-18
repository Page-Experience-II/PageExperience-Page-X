class Api::WorktypesController < ApplicationController

  def index
    @work = Worktype.all

    render json: @work
  end

  def worktypes
    render json: Worktype.all
  end

end
