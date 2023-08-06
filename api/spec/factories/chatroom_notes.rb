FactoryBot.define do
  factory :chatroom_note do
    sequence(:id)
    note { "Chatroom Description" }
    created_at { Time.zone.now }
    updated_at { Time.zone.now }
  end
end
