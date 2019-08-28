require 'test_helper'

class MoveControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get move_create_url
    assert_response :success
  end

end
