class Player
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name, type: String, default: ""
  field :age, type: Integer

  belongs_to :user

  class player < ApplicationRecord
    belongs_to :user
  end
  
end