class CreateWorktypes < ActiveRecord::Migration[5.2]
  def change
    create_table :worktypes do |t|
       t.string "worktype"
      t.timestamps
    end
  end
end
