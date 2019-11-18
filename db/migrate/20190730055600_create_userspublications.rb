class CreateUserspublications < ActiveRecord::Migration[5.2]
  def change
    create_table :userspublications do |t|
      t.integer "user_id"
      t.text "publication_text"
      t.string "publication_img"
      t.string "publication_vid"
      t.string "publication_doc"
      t.string "access"
      t.string "publication_type"
      t.string "work_type"
      t.integer "likes", default: 0
      t.integer "promote", default: 0
      t.timestamps
    end
  end
end
