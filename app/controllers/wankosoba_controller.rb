class WankosobaController < ApplicationController
  def home
    @data = get_data
  end

  def correct
    @data = get_data
  end

  private

  def get_data
    file = File.read(Rails.root.join('public', 'data.json'))
    data_array = JSON.parse(file)
    random_number = rand(0..data_array.count-1)
    data = data_array[random_number]
  end
end
