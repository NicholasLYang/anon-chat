class AddIsAvailableToConversations < ActiveRecord::Migration[6.0]
  def change
    add_column :conversations, :is_available, :boolean
  end
end
