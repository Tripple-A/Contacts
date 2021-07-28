# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Contact, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:first_name) }
    it { should validate_length_of(:first_name).is_at_least(3) }
    it { should validate_length_of(:first_name).is_at_most(25) }
    it { should validate_presence_of(:last_name) }
    it { should validate_length_of(:last_name).is_at_least(3) }
    it { should validate_length_of(:last_name).is_at_most(25) }
    it { should validate_uniqueness_of(:email) }
    it { should_not allow_value('test@test').for(:email) }
    it { should validate_presence_of(:phone_number) }
    it { should validate_numericality_of(:phone_number).with_message('is invalid') }
  end

  describe 'audits' do
    let(:contact) { create(:contact) }
    it 'responds to audits' do
      expect(Contact.respond_to?(:audited)).to be_truthy
    end

    it 'only creates an audit on contact edit' do
      expect(contact.audits.count).to eq(0)
      contact.update_attribute(:first_name, 'Hello')
      expect(contact.audits.count).to eq(1)
      contact.destroy
      expect(contact.audits.count).to eq(1)
    end
  end
end
