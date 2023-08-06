class ChatroomNote < ApplicationRecord
  belongs_to :chatroom, optional: false
end
