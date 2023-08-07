module Types
  class QueryType < Types::BaseObject
    field :chatroom_notes, [Types::ChatroomNoteType], null: false do
      argument :chatroom_id, ID, required: false
    end
    field :chatrooms, [Types::ChatroomType], null: false do
      argument :resolved, Boolean, required: false
    end
    field :nature_codes, [Types::NatureCodeType], null: false

    def chatrooms(resolved: false)
      Chatroom.where(resolved:).order(created_at: :desc)
    end

    def nature_codes
      NatureCode.all
    end

    def chatroom_notes(chatroom_id:)
      ChatroomNote.where(chatroom_id: chatroom_id).order(created_at: :desc)
    end
  end
end
