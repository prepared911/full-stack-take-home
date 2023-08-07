module Mutations
    class DeleteChatroomNote < BaseMutation
      argument :id, ID, required: true
  
      # fields
      field :success, Boolean, null: false
  
      # resolver
      def resolve(id:)
        chatroom_note = ChatroomNote.find(id)
        return { errors: 'Chatroom note not found' } if chatroom_note.nil?
        
        chatroom_note.destroy
        { success: chatroom_note.destroyed? }
      end
    end
  end