module Mutations
  class UpdateChatroomDescription < BaseMutation
    argument :id, ID, required: true
    argument :description, String, required: true

    # fields
    field :chatroom, Types::ChatroomType, null: false

    # resolver
    def resolve(id:, description:)
      chatroom = Chatroom.find_by(id: id)
      chatroom.update(description: description)
      {
        chatroom: chatroom
      }
    end
  end
end