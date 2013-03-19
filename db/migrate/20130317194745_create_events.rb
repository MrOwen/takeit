class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :datetime
      t.integer :poster
      t.integer :taker
      t.string :taken_datetime

      t.timestamps
    end
  end
end
