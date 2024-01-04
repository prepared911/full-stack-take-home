module Types
  class MutationType < Types::BaseObject
    field :create_chatroom, mutation: Mutations::CreateChatroom
    field :update_chatroom_nature_code, mutation: Mutations::UpdateChatroomNatureCode
  end
end
