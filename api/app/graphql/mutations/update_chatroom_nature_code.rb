module Mutations
  class UpdateChatroomNatureCode < BaseMutation
    argument :id, ID, required: true
    argument :nature_code_id, ID, required: true

    field :chatroom, Types::ChatroomType, null: false

    def resolve(id:, nature_code_id:)
      chatroom = Chatroom.find(id)
      nature_code = NatureCode.find(nature_code_id)

      if chatroom.nature_code_id != nature_code_id
        chatroom.update(nature_code_id: nature_code)
      end
      
      { chatroom: }
    end
  end
end