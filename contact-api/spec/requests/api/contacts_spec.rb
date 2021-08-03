# frozen_string_literal: true

require 'json'
require 'rails_helper'

RSpec.describe 'Api::Contacts', type: :request do
  def json_error(response)
    JSON.parse(response.body)['error']
  end

  let!(:contact) { create(:contact) }
  let(:serialized) { ContactSerializer.new(contact).attributes.to_json }
  let(:valid_params) do
    { first_name: 'Hello',
      last_name: 'There',
      email: 'hello@there.com',
      phone_number: '8083830881' }
  end
  let(:invalid_params) do
    { first_name: 'He',
      last_name: 'The',
      email: 'hello',
      phone_number: 'abc' }
  end

  describe 'GET #index' do
    before { get api_contacts_path }
    it 'should contain a list of all contacts' do
      expect(response).to have_http_status(:success)
      expect(response.body).to eq("[#{serialized}]")
    end
  end

  describe 'GET#show' do
    context 'when contact exists' do
      before { get api_contact_path(contact) }
      it 'returns the contact' do
        expect(response).to have_http_status(:success)
        expect(response.body).to eq(serialized)
      end
    end

    context 'when contact does not exist' do
      before { get :"/api/contacts/100" }
      it 'returns an error ' do
        expect(response).to have_http_status(:not_found)
        expect(json_error(response)).to eq('No such contact')
      end
    end
  end

  describe 'POST#create' do
    context 'with valid params' do
      before do
        post api_contacts_path, params: { contact: valid_params }
      end

      it 'creates a contact successfully' do
        expect(response).to have_http_status(:success)
        expect(response.body).to eq(ContactSerializer.new(Contact.last).attributes.to_json)
      end
    end

    context 'with invalid params' do
      before do
        post api_contacts_path, params: { contact: invalid_params }
      end
      it 'returns an error' do
        expect(response).to have_http_status(:bad_request)
        expect(json_error(response).keys).to match_array(%w[email first_name phone_number])
      end
    end
  end

  describe 'PUT#update' do
    context 'with valid params' do
      before do
        put api_contact_path(contact), params: { contact: valid_params }
      end

      it 'edits a contact successfully' do
        expect(response).to have_http_status(:success)
        contact.reload
        expect(contact.first_name).to eq('Hello')
      end
    end

    context 'with invalid params' do
      before do
        put api_contact_path(contact), params: { contact: invalid_params }
      end
      it 'returns an error' do
        expect(response).to have_http_status(:bad_request)
        expect(json_error(response).keys).to match_array(%w[email first_name phone_number])
      end
    end
  end

  describe 'DELETE#update' do
    subject { delete api_contact_path(contact) }

    it 'deletes a contact successfully' do
      expect { subject }.to change { Contact.count }.by(-1)
      expect(response).to have_http_status(:success)
      expect(response.body).to be_blank
    end
  end

  describe 'GET#history' do
    before do
      contact.update_attribute(:first_name, 'Danny')
      get api_path(contact)
    end

    it 'fetches the audit history of a contact successfully' do
      expect(response).to have_http_status(:success)
      keys = JSON.parse(response.body).first.keys
      expect(keys).to include('audited_changes')
      expect(keys).to include('created_at')
    end
  end
end
