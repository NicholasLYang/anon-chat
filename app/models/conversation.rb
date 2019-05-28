class Conversation < ApplicationRecord
  has_many :messages
  has_many :memberships

  def self.create_or_join(uuid:)
    # If there already exists a membership for the uuid, just return
    # that conversation
    membership = Membership.find_by(uuid: uuid)
    return {
      conversation: membership.conversation,
      user_index: membership.index
    } if membership

    # Otherwise, atomically find a conversation from the pool and
    # remove it.
    ActiveRecord::Base.transaction do
      @conversation = Conversation.where(is_available: true).first
      @conversation.update!(is_available: false) if @conversation
    end
    
    if @conversation.nil?
      @conversation = Conversation.create!(is_available: true)
      puts "CONVO"
      puts @conversation
      user_index = 1
    else
      user_index = 2
    end
    @conversation.memberships.create!(index: user_index, uuid: uuid)
    { conversation: @conversation, user_index: user_index }
  end
end
