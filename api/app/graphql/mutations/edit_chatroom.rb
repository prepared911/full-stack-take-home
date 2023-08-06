module Mutations
    class EditChatroom < BaseMutation
      argument :chatroom_id, ID, required: true
      argument :description, String, required: false
      argument :resolved, Boolean, required: false
  
      # fields
      field :chatroom, Types::ChatroomType, null: false
  
      # resolver
      def resolve(chatroom_id:, description: "", resolved: false)
        params = { description:, resolved: }.compact_blank
        chatroom = Chatroom.update(chatroom_id, **params)
        
        {
          chatroom: chatroom
        }
      end
    end
  end