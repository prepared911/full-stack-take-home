module Types
  class ChatroomNoteType < Types::BaseObject
    field :id, ID, null: false
    field :note, String, null: true
    field :chatroom_id, ID, null: true
    field :created_at, String, null: false
  end
end
