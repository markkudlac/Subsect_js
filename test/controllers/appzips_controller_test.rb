require 'test_helper'

class AppzipsControllerTest < ActionController::TestCase
  setup do
    @appzip = appzips(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:appzips)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create appzip" do
    assert_difference('Appzip.count') do
      post :create, appzip: { appname: @appzip.appname, description: @appzip.description, filesize: @appzip.filesize, icon: @appzip.icon, user_id: @appzip.user_id, zipfile: @appzip.zipfile }
    end

    assert_redirected_to appzip_path(assigns(:appzip))
  end

  test "should show appzip" do
    get :show, id: @appzip
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @appzip
    assert_response :success
  end

  test "should update appzip" do
    patch :update, id: @appzip, appzip: { appname: @appzip.appname, description: @appzip.description, filesize: @appzip.filesize, icon: @appzip.icon, user_id: @appzip.user_id, zipfile: @appzip.zipfile }
    assert_redirected_to appzip_path(assigns(:appzip))
  end

  test "should destroy appzip" do
    assert_difference('Appzip.count', -1) do
      delete :destroy, id: @appzip
    end

    assert_redirected_to appzips_path
  end
end
