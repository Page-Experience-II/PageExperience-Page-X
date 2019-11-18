class CreateAccesstypes < ActiveRecord::Migration[5.2]
  def change
    create_table :accesstypes do |t|
      t.string "accesstype"
      t.timestamps
    end
  end
end
