module Mutations
    class EditChatroom < BaseMutation
      argument :chatroom_id, ID, required: true
      argument :label, String, required: true
      argument :caller_phone_number, String, required: true
      argument :description, String, required: false
      argument :nature_code_id, ID, required: false
  
      # fields
      field :chatroom, Types::ChatroomType, null: false
  
      # resolver
      def resolve(chatroom_id:, label:, caller_phone_number:, description: nil, nature_code_id: nil )
        params = { label:, caller_phone_number:, description:, nature_code_id: }.compact_blank
        chatroom = Chatroom.update(chatroom_id, **params)
        
        {
          chatroom: chatroom
        }
      end
    end
  end