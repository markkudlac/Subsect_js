json.array!(@servers) do |server|
  json.extract! server, :id, :subname, :deviceid, :contact, :rtcid, :status
  json.url server_url(server, format: :json)
end
