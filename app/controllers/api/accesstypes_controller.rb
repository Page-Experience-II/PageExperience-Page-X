class Api::AccesstypesController < ApplicationController

  def index
    @access = Accesstype.all

    render json: @access
  end

  def accesstypes
    render json: Accesstype.all
  end

end
