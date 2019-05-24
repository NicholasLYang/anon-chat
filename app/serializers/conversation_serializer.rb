class ConversationSerializer
  include FastJsonapi::ObjectSerializer
  set_type :conversation
  set_key_transform :camel_lower
  attributes :title
  has_many :messages
end
