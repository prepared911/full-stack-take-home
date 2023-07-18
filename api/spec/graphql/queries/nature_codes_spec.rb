require "rails_helper"

RSpec.describe "NatureCodes", type: :request do
  let!(:nature_codes) { create_list(:nature_code, 3) }
  
  def query
    <<~GQL
      query NatureCodes {
        natureCodes {
          id
          name
        }
      }
    GQL
  end
    
  it "returns all nature codes" do
    post '/graphql', params: { query: }
    
    response_json = JSON.parse(response.body)
    
    expect(response_json['data']['natureCodes'].count).to eq(nature_codes.count)
  end
end