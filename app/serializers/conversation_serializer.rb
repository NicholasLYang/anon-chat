class ConversationSerializer
  include FastJsonapi::ObjectSerializer
  set_type :conversation
  set_key_transform :camel_lower
  has_many :messages
end
