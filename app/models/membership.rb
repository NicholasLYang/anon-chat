class Membership < ApplicationRecord
  belongs_to :converation
  belongs_to :user
end
