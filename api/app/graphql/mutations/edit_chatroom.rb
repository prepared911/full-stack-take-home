module Mutations
  class EditChatroom < BaseMutation
    MUTABLE_FIELDS = [:description, :resolved]

    argument :id, ID, required: true
    argument :description, String, required: false
    argument :resolved, Boolean, required: false

    # fields
    field :chatroom, Types::ChatroomType, null: false

    # resolver
    def resolve(id:, description: nil, resolved: nil)
      if [description, resolved].all?(nil?)
        raise ArgumentError, "You must provide one of: #{MUTABLE_FIELDS} to mutate"
      end

      begin
        chatroom = Chatroom.find(id)
      rescue ActiveRecord::RecordNotFound => _
        raise ArgumentError, "Please provide a valid chatroom id to mutate"
      end

      params = {description:, resolved:}.compact_blank
      chatroom.update(params)
      
      {
        chatroom: chatroom
      }
    end
  end
end