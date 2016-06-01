class AppzipsController < ApplicationController
  before_action :set_appzip, only: [:show, :edit, :update, :destroy, :serve]
  before_action :authenticate_user!, except: [:serve, :subzaar]
  
  # GET /appzips
  # GET /appzips.json
  def index
    @appzips = Appzip.all
  end

  # GET /appzips/1
  # GET /appzips/1.json
  def show
  end

  # GET /appzips/new
  def new
    @appzip = Appzip.new
    @appzip[:user_id] = current_user.id
  end

  # GET /appzips/1/edit
  def edit
  end

  # POST /appzips
  # POST /appzips.json
  def create
    @appzip = Appzip.new(appzip_params)
    upload = appzip_params[:zipfile]
    
    @appzip[:zipfile] = Base64.encode64(File.read(upload.path))
    @appzip[:filesize] = upload.size
    @appzip[:user_id] = current_user.id
    @appzip[:icon] = "data:" + appzip_params[:icon].content_type + ";base64," + 
          Base64.encode64(File.read(appzip_params[:icon].path))
    respond_to do |format|
      if @appzip.save
        format.html { redirect_to @appzip, notice: 'Appzip was successfully created.' }
        format.json { render :show, status: :created, location: @appzip }
      else
        format.html { render :new }
        format.json { render json: @appzip.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /appzips/1
  # PATCH/PUT /appzips/1.json
  def update
    upload = appzip_params[:zipfile]
    newparams = appzip_params
     if !upload.nil? then
       newparams[:zipfile] = Base64.encode64(File.read(upload.path))
       newparams[:filesize] = upload.size
     end
     
     upload = appzip_params[:icon]
     if !upload.nil? then
       puts "Icon path : " + upload.content_type
       newparams[:icon] = "data:" + upload.content_type + ";base64," +Base64.encode64(File.read(upload.path))
     end
     
    respond_to do |format|
      if @appzip.update(newparams)
        format.html { redirect_to @appzip, notice: 'Appzip was successfully updated.' }
        format.json { render :show, status: :ok, location: @appzip }
      else
        format.html { render :edit }
        format.json { render json: @appzip.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /appzips/1
  # DELETE /appzips/1.json
  def destroy
    @appzip.destroy
    respond_to do |format|
      format.html { redirect_to appzips_url, notice: 'Appzip was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def serve
#    send_data(@appzip[:zipfile], :type => "text/html", :filename => "rootpack.html")
    render json: @appzip
  end
  
  def subzaar
    @appzips = Appzip.all
  end
  
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_appzip
      @appzip = Appzip.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def appzip_params
      params.require(:appzip).permit(:user_id, :zipfile, :pkgname, :filesize,
       :title, :description, :icon, :dbtype)
    end
end
