class AddIsActiveToMemberships < ActiveRecord::Migration[6.0]
  def change
    add_column :memberships, :is_active, :boolean, default: true
  end
end
