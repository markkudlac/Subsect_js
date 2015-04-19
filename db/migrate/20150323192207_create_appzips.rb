class CreateAppzips < ActiveRecord::Migration
  def change
    create_table :appzips do |t|
      t.integer :user_id,      :null => false
      t.text :zipfile,        :null => false
      t.string :pkgname,       :limit => 15   #This is the package/directory name
      t.integer :filesize,     :default => 0
      t.string :title,       :limit => 40     #Descriptive title
      t.text :description,     :limit => 1500
      t.text :icon
      t.string :dbtype,          :limit => 2, :default => "U_"
      t.string :status,          :limit => 1, :default => "A"
      t.timestamps null: false
    end
    
    add_index :appzips, :user_id
    add_index :appzips, :pkgname
  end
end
