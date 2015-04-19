json.array!(@appzips) do |appzip|
  json.extract! appzip, :id, :user_id, :pkgname, :filesize, :title, :description, :icon, :dbtype, :status
  json.url appzip_url(appzip, format: :json)
end
