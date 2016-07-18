class AddPasswdToServers < ActiveRecord::Migration
  def change
    add_column :servers, :passwd, :string, :limit => 40
    add_column :servers, :contact, :string, :limit => 50
  end
end
