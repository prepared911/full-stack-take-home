module Mutations
    class DeleteChatroomNote < BaseMutation
      argument :id, ID, required: true
  
      # fields
      field :chatroom_note, Types::ChatroomNoteType, null: false
  
      # resolver
      def resolve(id:)
        chatroom_note = ChatroomNote.find(id)
        return { errors: 'Chaatroom note not found' } if chatroom_note.nil?
        
        chatroom_note.destroy
        { chatroom_note: chatroom_note.reload }
      end
    end
  end