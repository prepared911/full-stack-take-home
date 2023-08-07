require "rails_helper"

RSpec.describe "Mutations::CreateChatroomNote", type: :request do
  let(:chatroom) { create(:chatroom) }
  
  let(:note) { "Chatroom note text" }
  let(:chatroom_id) { chatroom.id }
  let(:variables) do
    {
      note: note,
      chatroomId: chatroom_id
    }.to_json
  end
  
  let(:query) do
    <<~GQL
      mutation CreateChatroomNote(
        $note: String
        $chatroomId: ID!
      ) {
        createChatroomNote(
          input: {
            note: $note
            chatroomId: $chatroomId
          }
        ) {
          chatroomNote {
            id
            note
            chatroomId
            createdAt
          }
        }
      }    
    GQL
  end

  it "creates a new chatroom note" do
    expect { post '/graphql', params: { query:, variables: } }.to change { ChatroomNote.count }.from(0).to(1)

    response_json = JSON.parse(response.body)

    chatroom_note = ChatroomNote.find(response_json['data']['createChatroomNote']['chatroomNote']['id'])
    
    expect(chatroom_note.note).to eq(note)
    expect(chatroom_note.chatroom_id).to eq(chatroom_id)
  end

  context "when required fields are not provided" do
    let(:note) { nil }
    let(:chatroom_id) { nil }

    it "returns an error" do
      expect { post '/graphql', params: { query:, variables: } }.to_not change { Chatroom.count }
  
      response_json = JSON.parse(response.body)
      expect(response_json["errors"].count).to be > 0
    end
  end
end