 class ApiController < ApplicationController 
  
 # protect_from_forgery :except => :setrtcid
  
   def getrtcid
     server = Server.where(subname: api_params(params)[:subname])
    
     if server.length == 0 then
       render :json => {rtn: false}
     else
#       render :json => {rtcid: server[0].rtcid}
#puts "rtcid : #{server[0].rtcid}"
       render :json => {rtn: true, rtcid: server[0].rtcid, status: server[0].status}
     end 
   end
   
   
   def setrtcid
     begin
       if (0 == Server.where({subname: api_params(params)[:subname],
               passwd: api_params(params)[:passwd]}).
           update_all(rtcid: api_params(params)[:rtcid], status: "A")) then
           render :json => {rtn: false}
      else
        render :json => {rtn: true}
      end
         
    rescue
      render :json => {rtn: false}
    end
   end
 
 
   def hostavailable
     server = Server.where(subname: api_params(params)[:subname])
    
     if server.length == 0 then
       render :json => {rtn: true, contact: ""}
     else
#puts "rtcid : #{server[0].rtcid}"
       render :json => {rtn: false, contact: server[0].contact}
     end 
   end
   
   
   def hostsubmit
     begin
       if (Server.where(subname: api_params(params)[:subname]).length == 0) then
         
         Server.create(subname: api_params(params)[:subname], contact: api_params(params)[:contact],
             passwd: api_params(params)[:passwd], deviceid: api_params(params)[:deviceid], status: "O"
         )
          render :json => {rtn: true}
       elsif (0 == Server.where({subname: api_params(params)[:subname],
           passwd: api_params(params)[:opasswd]}).
           update_all(contact: api_params(params)[:contact],
             passwd: api_params(params)[:passwd])) then
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
       if (0 == Server.where({subname: api_params(params)[:subname],
             passwd: api_params(params)[:passwd]}).
           update_all(status: "O")) then
           render :json => {rtn: false}
      else
        render :json => {rtn: true}
      end
         
    rescue
      render :json => {rtn: false}
    end
   end
   
   
   def control
     begin
       server = Server.where({subname: api_params(params)[:subname],
             passwd: api_params(params)[:passwd]})
       if (0 == server.length) then
           render :json => {rtn: false}
      else
        if (server[0].status == "R") then
          render :json => {rtn: true, action: "reset"}
        else
          render :json => {rtn: false}
        end
        
      end
         
    rescue
      render :json => {rtn: false}
    end
   end
   
 private 
 
  def api_params(xparams)
#    puts "PARAMS PASSED : #{xparams}"
#     xparams = xparams.require(:resolver) if xparams[:resolver]
 
      xparams.permit(:subname, :rtcid, :deviceid, :contact, :passwd, :opasswd)
  end
  
end