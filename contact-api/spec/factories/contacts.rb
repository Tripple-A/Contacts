# frozen_string_literal: true

FactoryBot.define do
  factory :contact do
    first_name { 'Henry' }
    last_name { 'Eke' }
    email { 'eke@true.com' }
    phone_number { 2_346_789_034 }
  end
end
