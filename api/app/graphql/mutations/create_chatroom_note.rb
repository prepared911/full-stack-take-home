module Mutations
  class CreateChatroomNote < BaseMutation
    argument :note, String, required: false
    argument :chatroom_id, ID, required: true

    # fields
    field :chatroom_note, Types::ChatroomNoteType, null: false

    # resolver
    def resolve(note:, chatroom_id: nil)
      params = { note:, chatroom_id: }.compact_blank
      chatroom_note = ChatroomNote.create(**params)
      
      {
          chatroom_note: chatroom_note
      }
    end
  end
end
