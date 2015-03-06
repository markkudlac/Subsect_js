json.array!(@servers) do |server|
  json.extract! server, :id, :subname, :deviceid, :rtcid, :status
  json.url server_url(server, format: :json)
end
