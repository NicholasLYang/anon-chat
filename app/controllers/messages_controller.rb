class MessagesController < ApplicationController

  def index
    messages = Message
                 .where(conversation_id: params[:convo_id])
                 .order(created_at: :desc)
                 .page(params[:page] || 1)
    render json: MessageSerializer.new(messages)
  end
  
  def create
    @message = Message.create!(
      message_params.merge(conversation_id: params[:convo_id])
    )
    conversation = Conversation.find(@message.conversation_id)
    serializer = MessageSerializer.new(@message)
    serialized_data = serializer.serializable_hash
    MessagesChannel.broadcast_to conversation, serialized_data
    render json: serializer
  end


  private

  def message_params
    params.require(:message).permit(:text, :user_index)
  end
end
