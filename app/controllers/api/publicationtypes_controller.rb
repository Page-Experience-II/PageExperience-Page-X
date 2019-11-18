class Api::PublicationtypesController < ApplicationController

  def index
    @publication = Publicationtype.all

    render json: @publication
  end

  def worktypes
    render json: Publicationtype.all
  end

end
