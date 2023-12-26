module Mutations
  class UpdateChatroom < BaseMutation
    argument :id, ID, required: true
    argument :description, String, required: false
    argument :resolved, Boolean, required: false

    # fields
    field :chatroom, Types::ChatroomType, null: false

    # resolver
    def resolve(id:, description: nil, resolved: nil)
      params = { description:, resolved: }.compact_blank
      
      chatroom = Chatroom.find(id)
      chatroom.update(params) unless params.blank?
      
      {
        chatroom: chatroom
      }
    end
  end
end