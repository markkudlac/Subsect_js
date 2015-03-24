json.array!(@appzips) do |appzip|
  json.extract! appzip, :id, :user_id, :appname, :filesize, :description, :icon
  json.url appzip_url(appzip, format: :json)
end
