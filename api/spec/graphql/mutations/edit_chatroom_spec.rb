require "rails_helper"

RSpec.describe "Mutations::EditChatroom", type: :request do
    let(:original_description) {"Caller has requested a wellness check on their grandma."}
    let(:description) {"New improved description"}
    let(:query) do
        <<~GQL
        mutation EditChatroom(
            $id: ID!
            $description: String
            $resolved: Boolean
        ) {
            editChatroom(
            input: {
                id: $id
                description: $description
                resolved: $resolved
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

    it "allows updating the description on a chatroom" do
        chatroom = Chatroom.create(
            label: "Checking-up on my grandma",
            caller_phone_number: "12223334444",
            description: :original_description,
            nature_code: NatureCode.find_by(name: "Wellness Check"),
            resolved: false
        )
        post '/graphql', params: { query:, variables: {id: chatroom.id, description:} }
        response_json = JSON.parse(response.body)

        chatroom = Chatroom.find(response_json['data']['editChatroom']['chatroom']['id'])
        
        expect { Chatroom.count == 1 }
        expect(chatroom).to be_truthy
        expect(chatroom.description).to eq(description)
        expect(chatroom.resolved).to be_falsey
    end

    it "throws an error when an invalid id is provided" do
        chatroom = Chatroom.create(
            label: "Checking-up on my grandma",
            caller_phone_number: "12223334444",
            description: "Caller has requested a wellness check on their grandma.",
            nature_code: NatureCode.find_by(name: "Wellness Check"),
            resolved: false
        )
        expect { post '/graphql', params: { query:, variables: {id: 3141, description:} } }.to raise_error(ArgumentError)
    end
end