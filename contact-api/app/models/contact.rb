# frozen_string_literal: true

class Contact < ApplicationRecord
  EMAIL_REGEX = /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/
  validates :first_name, :last_name, presence: true, length: { minimum: 3, maximum: 25 }
  validates :email, presence: true, uniqueness: true
  validates_format_of :email, with: EMAIL_REGEX, message: 'invalid email format'
  validates :phone_number,
            presence: true, format: { with: /\A+?\d+\z/ }
  audited on: :update
  scope :arranged, -> { order(first_name: :asc) }

  def audit_history
    audits.descending.pluck_to_hash(:audited_changes, :created_at)
  end
end
