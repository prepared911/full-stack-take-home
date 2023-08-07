require "rails_helper"

RSpec.describe "Mutations::DeleteChatroomNote", type: :request do
  let!(:chatroom_note) { create(:chatroom_note) }
  
  let(:chatroom_note_id) { chatroom_note.id }
  let(:variables) do
    {
      id: chatroom_note_id
    }.to_json
  end
  
  let(:query) do
    <<~GQL
      mutation DeleteChatroomNote(
        $id: ID!
      ) {
        deleteChatroomNote(
          input: {
            id: $id
          }
        ) {
          success
        }
      }    
    GQL
  end

  it "deletes a chatroom note" do
    expect { post '/graphql', params: { query:, variables: } }.to change { ChatroomNote.count }.from(1).to(0)

    response_json = JSON.parse(response.body)

    delete_success = response_json['data']['deleteChatroomNote']['success']
    
    expect(delete_success).to eq(true)
  end

  context "when required fields are not provided" do
    let(:chatroom_note_id) { nil }

    it "returns an error" do
      expect { post '/graphql', params: { query:, variables: } }.to_not change { Chatroom.count }
  
      response_json = JSON.parse(response.body)
      
      expect(response_json["errors"].count).to be > 0
    end
  end
end
