class ConversationsController < ApplicationController
  def index
    render json: ConversationSerializer.new(Conversation.all)
  end

  ## If there is a conversation available, joins the chat. Otherwise
  ## creates one
  def create_or_join
    raise ActionController::ParameterMissing.new("uuid") if
      params[:uuid].nil?
    res = Conversation.create_or_join(uuid: params[:uuid])

    serializer = ConversationSerializer.new(res[:conversation])
    render json: serializer.serializable_hash.merge(user_index: res[:user_index])
  end
end
