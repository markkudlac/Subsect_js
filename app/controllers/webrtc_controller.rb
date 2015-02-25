class WebrtcController < ApplicationController
  
  def client
    
    puts "PARAMS PASSED : #{app_params(params)[:appname]}"
    @appName = app_params(params)[:appname]
    
    if (@appName == nil || @appName.length == 0) then
      redirect_to "/app/Menu"
    elsif (@appName == "TestApp" ||
      @appName == "Menu") then
      @appPath = "SysHtml/" + @appName + "/"
    else
      @appPath = "UserHtml/" + @appName + "/"
    end
  end
  
  def server
  end
  
  private
  
    def app_params(xparams)
  #    puts "PARAMS PASSED : #{xparams}"
  #     xparams = xparams.require(:resolver) if xparams[:resolver]
   
        xparams.permit(:appname)
    end
end
  