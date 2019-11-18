class CreatePublicationtypes < ActiveRecord::Migration[5.2]
  def change
    create_table :publicationtypes do |t|
      t.string "publicationtype"
      t.timestamps
    end
  end
end
