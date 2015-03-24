class CreateAppzips < ActiveRecord::Migration
  def change
    create_table :appzips do |t|
      t.integer :user_id,      :null => false
      t.text :zipfile,        :null => false
      t.string :appname,       :limit => 40
      t.integer :filesize,     :default => 0
      t.text :description,     :limit => 1500
      t.text :icon
      t.string :dbtype,          :limit => 2, :default => "U_"
      t.string :status,          :limit => 1, :default => "A"
      t.timestamps null: false
    end
    
    add_index :appzips, :user_id
  end
end
