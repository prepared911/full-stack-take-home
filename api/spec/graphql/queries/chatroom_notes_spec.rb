require "rails_helper"

RSpec.describe "ChatroomNotes", type: :request do
  let(:chatroom_notes) { create_list(:chatroom_note, 3) }
  let(:chatroom) { create(:chatroom, chatroom_notes: chatroom_notes) }
  let(:chatroom_id) { chatroom.id }

  let(:variables) { { chatroomId: chatroom_id }.to_json }
  
  let(:query) do
    <<~GQL
      query ChatroomNotesList($chatroomId: ID!) {
        chatroomNotes(chatroomId: $chatroomId) {
          id
          note
          createdAt
          chatroomId
        }
      }
    GQL
  end

  context "when a chatroom has notes" do
    let(:chatroom_id) { chatroom.id }
    
    it "returns all chatroom notes" do
      post '/graphql', params: { query:, variables: }

      response_json = JSON.parse(response.body)
      chatroom_note_ids = response_json['data']['chatroomNotes'].map { |chatroom_note| chatroom_note['id'] }
      response_chatroom_notes = ChatroomNote.where(id: chatroom_note_ids)
      
      expect(response_chatroom_notes.count).to eq(chatroom_notes.count)
      expect(response_chatroom_notes).to all(have_attributes(chatroom_id: chatroom_id))
    end
  end
end
