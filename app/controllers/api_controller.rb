 class ApiController < ApplicationController 
  
 # protect_from_forgery :except => :setrtcid
  
   def getrtcid
     server = Server.where(subname: api_params(params)[:subname])
    
     if server.length == 0 then
       render :json => {rtn: false}
     else
#       render :json => {rtcid: server[0].rtcid}
       render :json => server[0]
     end 
   end
   
   
   def setrtcid
     begin
       if (0 == Server.where(subname: api_params(params)[:subname]).
           update_all(rtcid: api_params(params)[:rtcid], status: "A")) then
           render :json => {rtn: false}
      else
        render :json => {rtn: true}
      end
         
    rescue
      render :json => {rtn: false}
    end
   end
 
 
   def offline
     begin
       if (0 == Server.where(subname: api_params(params)[:subname]).
           update_all(status: "O")) then
           render :json => {rtn: false}
      else
        render :json => {rtn: true}
      end
         
    rescue
      render :json => {rtn: false}
    end
   end
   
   
 private 
 
  def api_params(xparams)
#    puts "PARAMS PASSED : #{xparams}"
#     xparams = xparams.require(:resolver) if xparams[:resolver]
 
      xparams.permit(:subname, :rtcid)
  end
  
end