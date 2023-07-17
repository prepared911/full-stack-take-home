FactoryBot.define do
  factory :chatroom do
    sequence(:id)
    label { "Chatroom Label" }
    description { "Chatroom Description" }
    caller_phone_number { "12223334444" }
    archived { false }
    created_at { Time.zone.now }
    updated_at { Time.zone.now }
  end
end
