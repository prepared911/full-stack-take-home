module Types
  class QueryType < Types::BaseObject
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
  end
end
