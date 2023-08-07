module Types
  class MutationType < Types::BaseObject
    field :create_chatroom_note, mutation: Mutations::CreateChatroomNote
    field :create_chatroom, mutation: Mutations::CreateChatroom
    field :edit_chatroom, mutation: Mutations::EditChatroom
    field :delete_chatroom_note, mutation: Mutations::DeleteChatroomNote
  end
end
