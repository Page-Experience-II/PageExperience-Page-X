class CreateFollowers < ActiveRecord::Migration[5.2]
  def change
    create_table :followers do |t|
      t.integer :user_id
      t.integer :followeduser_id
      t.timestamps
    end
  end
end
