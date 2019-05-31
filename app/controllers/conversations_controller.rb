class ConversationsController < ApplicationController
  
  def index
    render json: ConversationSerializer.new(Conversation.all)
  end

  ## If there is a conversation available, joins the chat. Otherwise
  ## creates one
  def create_or_join
    res = Conversation.create_or_join(uuid: conversation_params[:uuid])
    serializer = ConversationSerializer.new(res[:conversation])
    render json: serializer.serializable_hash.merge(user_index: res[:user_index])
  end

  # Leave conversation and get a new one
  def delete
    membership = Membership.find_by(uuid: conversation_params[:uuid])
    convo = membership.conversation
    leave_message = convo.messages.create(text: "Conversation has ended", user_index: -1)
    MessagesChannel.broadcast_to convo, MessageSerializer.new(leave_message)
    membership.update(is_active: false) if membership
    create_or_join
  end

  private

  def conversation_params
    params.require(:conversation).permit(:uuid)
  end
end
