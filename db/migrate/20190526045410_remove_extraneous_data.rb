class RemoveExtraneousData < ActiveRecord::Migration[6.0]
  def change
    remove_column :conversations, :title, :string
    remove_column :memberships, :user_id, :bigint
    remove_column :messages, :user_id, :bigint
    add_column :memberships, :index, :bigint
    add_column :memberships, :uuid, :uuid
    add_column :messages, :user_index, :bigint
    
    execute "DROP TABLE #{:users} CASCADE"
  end
end
