class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.date :dob
      t.string :email
      t.string :phone
      t.string :school
      t.string :profession
      t.string :location
      t.string :bio
      t.string :password_digest
      t.datetime :last_login
      t.timestamps
    end
  end
end
