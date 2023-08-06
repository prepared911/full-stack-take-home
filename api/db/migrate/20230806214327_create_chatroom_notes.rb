class CreateChatroomNotes < ActiveRecord::Migration[7.0]
  def change
    create_table :chatroom_notes do |t|

      t.timestamps
      t.string :note, null: false
    end
  end
end
