class WebrtcController < ApplicationController
  
  def client
    
#    puts "PARAMS PASSED : #{app_params(params)[:pkgname]}"
    @appName = app_params(params)[:pkgname]
    
    @appSubId = request.subdomain
    puts "PeerId : #{@appSubId}"
    puts "pkgname : #{@appName}"
    
    if (@appName == nil || @appName.length == 0 ) then
      redirect_to "/pkg/Menu"
    elsif @appName == "Menu" then
      @appPath = "sys/Menu/"
    else
      appzip = Appzip.where(pkgname: @appName)
    
      if appzip.length > 0 && appzip[0].dbtype == "S_" then
        @appPath = "sys/" + @appName + "/"
      else
        @appPath = "usr/" + @appName + "/"
      end
    end
  end
  
  private
  
    def app_params(xparams)
  #    puts "PARAMS PASSED : #{xparams}"
  #     xparams = xparams.require(:resolver) if xparams[:resolver]
   
        xparams.permit(:pkgname, :pkgargs)
    end
end
  