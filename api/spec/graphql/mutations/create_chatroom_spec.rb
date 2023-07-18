require "rails_helper"

RSpec.describe "Mutations::CreateChatroom", type: :request do
  let(:nature_code) { create(:nature_code) }
  
  let(:label) { "New chatroom" }
  let(:description) { "Chatroom description" }
  let(:caller_phone_number) { "12223334444" }
  let(:nature_code_id) { nature_code.id }
  let(:variables) do
    {
      label:,
      description:,
      callerPhoneNumber: caller_phone_number,
      natureCodeId: nature_code_id
    }.to_json
  end
  
  let(:query) do
    <<~GQL
      mutation CreateChatroom(
        $label: String!
        $callerPhoneNumber: String!
        $description: String
        $natureCodeId: ID
      ) {
        createChatroom(
          input: {
            label: $label
            callerPhoneNumber: $callerPhoneNumber
            description: $description
            natureCodeId: $natureCodeId
          }
        ) {
          chatroom {
            id
            label
            description
            callerPhoneNumber
            natureCode {
              id
              name
            }
          }
        }
      }    
    GQL
  end

  it "creates a new chatroom" do
    expect { post '/graphql', params: { query:, variables: } }.to change { Chatroom.count }.from(0).to(1)

    response_json = JSON.parse(response.body)

    chatroom = Chatroom.find(response_json['data']['createChatroom']['chatroom']['id'])
    
    expect(chatroom).to be_truthy
    expect(chatroom.label).to eq(label)
    expect(chatroom.caller_phone_number).to eq(caller_phone_number)
    expect(chatroom.nature_code_id).to eq(nature_code_id)
  end

  context "when required fields are not provided" do
    let(:label) { nil }
    let(:caller_phone_number) { nil }

    it "returns an error" do
      expect { post '/graphql', params: { query:, variables: } }.to_not change { Chatroom.count }
  
      response_json = JSON.parse(response.body)
      expect(response_json["errors"].count).to be > 0
    end
  end
end