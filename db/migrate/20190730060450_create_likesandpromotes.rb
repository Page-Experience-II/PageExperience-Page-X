class CreateLikesandpromotes < ActiveRecord::Migration[5.2]
  def change
    create_table :likesandpromotes do |t|
      t.integer "userspublication_id"
      t.integer "likeduser_id"
      t.integer "promoteduser_id"
      t.timestamps
    end
  end
end
