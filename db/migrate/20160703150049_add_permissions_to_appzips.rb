class AddPermissionsToAppzips < ActiveRecord::Migration
  def change
    add_column :appzips, :permissions, :string, :limit => 3, :default => "FFF"
  end
end
