class ConversationsController < ApplicationController
  def index
    render json: ConversationSerializer.new(Conversation.all)
  end
  
  def create
    @conversation = Conversation.new(conversation_params)
    if @conversation.save
      serializer = ConversationSerializer.new(@conversation)
      ActionCable.server.broadcast('conversations_channel', serializer.serializable_hash)
      render json: serializer
    end
  end
  
  private
  
  def conversation_params
    params.require(:conversation).permit(:title)
  end
end
