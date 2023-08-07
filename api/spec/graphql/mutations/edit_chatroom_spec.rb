require "rails_helper"

RSpec.describe "Mutations::EditChatroom", type: :request do
  let(:chatroom) { create(:chatroom) }
  
  let(:description) { "Chatroom description" }
  let(:chatroom_id) { chatroom.id }
  let(:resolved) { false }
  let(:variables) do
    {
      description:,
      resolved:,
      chatroomId: chatroom_id
    }.to_json
  end
  
  let(:query) do
    <<~GQL
      mutation EditChatroom(
        $resolved: Boolean
        $description: String
        $chatroomId: ID!
      ) {
        editChatroom(
          input: {
            resolved: $resolved
            description: $description
            chatroomId: $chatroomId
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

  it "edits a chatroom description" do
    expect { post '/graphql', params: { query:, variables: } }.to change { Chatroom.count }.from(0).to(1)

    response_json = JSON.parse(response.body)

    chatroom = Chatroom.find(response_json['data']['editChatroom']['chatroom']['id'])
    
    expect(chatroom).to be_truthy
    expect(chatroom.resolved).to eq(false)
    expect(chatroom.description).to eq(description)
    expect(chatroom.id).to eq(chatroom_id)
  end

  context "when required fields are not provided" do
    let(:chatroom_id) { nil }

    it "returns an error" do
      expect { post '/graphql', params: { query:, variables: } }.to_not change { Chatroom.count }
  
      response_json = JSON.parse(response.body)
      expect(response_json["errors"].count).to be > 0
    end
  end
end
