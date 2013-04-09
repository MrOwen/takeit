class RedoTakenPostedShiftTimes < ActiveRecord::Migration
  def up
  	remove_column :events, :datetime
  	add_column :events, :start_datetime, :string
  	add_column :events, :end_datetime, :string
  end

  def down
  	remove_column :events, :start_datetime, :string
  	remove_column :events, :end_datetime, :string
  end
end
