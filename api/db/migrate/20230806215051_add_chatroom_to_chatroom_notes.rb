class AddChatroomToChatroomNotes < ActiveRecord::Migration[7.0]
  def change
    add_reference :chatroom_notes, :chatroom, null: false, foreign_key: true
  end
end
