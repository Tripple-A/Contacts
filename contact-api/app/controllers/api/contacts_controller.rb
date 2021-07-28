# frozen_string_literal: true

module Api
  class ContactsController < ApplicationController
    def index
      contacts = Contact.all
      render json: contacts, status: 200
    end

    def show
      contact = Contact.where(id: params[:id]).first
      if contact
        render json: contact, status: 200
      else
        render json: {errors: 'No such contact'}, status: :not_found
      end
    end

    def create
      contact = Contact.new(contact_params)
      if contact.save
        render json: contact, status: 201
      else
        render json: { errors: contact.errors }, status: 400
      end
    end

    private

    def contact_params
      params.require(:contact).permit(:first_name, :last_name, :email, :phone_number)
    end
  end
end
