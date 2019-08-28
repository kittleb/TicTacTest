class UserController < ApplicationController
  
  def index
  	render :json => { hello: 'world' }
  end

  def create
  end

  def update
  end
end
