module Types
  class ChatroomType < Types::BaseObject
    field :id, ID, null: false
    field :label, String, null: false
    field :description, String, null: true
    field :resolved, Boolean, null: false
    field :caller_phone_number, String, null: false
    field :nature_code, Types::NatureCodeType, null: true
    field :chatroom_notes, Types::ChatroomNoteType, null: true
  end
end