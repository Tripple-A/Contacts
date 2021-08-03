# frozen_string_literal: true

module Api
  class ContactsController < ApplicationController
    before_action :set_contact, only: %i[show update destroy history]

    def index
      contacts = Contact.arranged
      render json: contacts, status: 200
    end

    def show
      render json: @contact, status: 200
    end

    def create
      contact = Contact.new(contact_params)
      if contact.save
        render json: contact, status: 201
      else
        render json: { error: contact.errors }, status: 400
      end
    end

    def update
      if @contact.update(contact_params)
        render json: @contact, status: 200
      else
        render json: { error: @contact.errors }, status: 400
      end
    end

    def destroy
      if @contact.destroy
        render json: {}, status: 204
      else
        render json: { error: 'Not deleted' }, status: 400
      end
    end

    def history
      audits = @contact.audit_history
      render json: audits, status: 200
    end

    private

    def contact_params
      params.require(:contact).permit(:first_name, :last_name, :email, :phone_number)
    end

    def set_contact
      @contact = Contact.find(params[:id])
    end
  end
end
