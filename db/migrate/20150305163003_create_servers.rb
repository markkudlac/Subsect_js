class CreateServers < ActiveRecord::Migration
  def change
    create_table :servers do |t|
      t.string :subname, :limit => 20, :null => false
      t.string :deviceid, :limit => 50, :null => false
      t.string :rtcid, :limit => 20
      t.string :status, :limit => 1, :default => "A", :null => false

      t.timestamps null: false
    end
    add_index :servers, :subname, unique: true
  end
end
