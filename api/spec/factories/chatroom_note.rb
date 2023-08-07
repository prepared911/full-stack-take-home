FactoryBot.define do
  factory :chatroom_note do
    sequence(:id)
    note { "Chatroom Note Description" }
    created_at { Time.zone.now }
    updated_at { Time.zone.now }
    association :chatroom, factory: :chatroom
  end
end
