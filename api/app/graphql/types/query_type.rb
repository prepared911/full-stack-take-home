module Types
  class QueryType < Types::BaseObject
    field :chatrooms, [Types::ChatroomType], null: false do
      argument :archived, Boolean, required: false
    end
    field :nature_codes, [Types::NatureCodeType], null: false

    def chatrooms(archived: false)
      Chatroom.where(archived:).order(created_at: :desc)
    end

    def nature_codes
      NatureCode.all
    end
  end
end
