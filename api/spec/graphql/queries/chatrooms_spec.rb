require "rails_helper"

RSpec.describe "Chatrooms", type: :request do
  let!(:chatrooms) { create_list(:chatroom, 3) }
  let!(:archived_chatrooms) { create_list(:chatroom, 3, archived: true) }

  let(:archived) { false }
  let(:variables) { { archived: }.to_json }
  
  let(:query) do
    <<~GQL
      query Chatrooms($archived: Boolean) {
        chatrooms(archived: $archived) {
          id
          label
          description
          callerPhoneNumber
          archived
          natureCode {
            id
            name
          }
        }
      }
    GQL
  end

  before { post '/graphql', params: { query:, variables: } }

  context "when archived flag is false" do
    let(:archived) { false }
    
    it "returns all non-archived chatrooms" do
      response_json = JSON.parse(response.body)

      response_chatroom_ids = response_json['data']['chatrooms'].map { |chatroom| chatroom['id'] }
      response_chatrooms = Chatroom.where(id: response_chatroom_ids)
      
      expect(response_chatrooms.count).to eq(chatrooms.count)
      expect(response_chatrooms).to all(have_attributes(archived: false))
    end
  end

  context "when archived flag is true" do
    let(:archived) { true }
    
    it "returns all archived chatrooms" do
      response_json = JSON.parse(response.body)
      response_chatroom_ids = response_json['data']['chatrooms'].map { |chatroom| chatroom['id'] }
      response_chatrooms = Chatroom.where(id: response_chatroom_ids)
      
      expect(response_chatrooms.count).to eq(archived_chatrooms.count)
      expect(response_chatrooms).to all(have_attributes(archived: true))
    end
  end
end