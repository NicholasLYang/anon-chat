class MessageSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower # "some_key" => "someKey"
  set_type :message
  attributes :id, :conversation_id, :text, :created_at
end
