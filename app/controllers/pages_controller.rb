class PagesController < ApplicationController
  def home
    @current_year = Date.today.year
    @current_month = Date.today.month
    @current_day = Date.today.day
    @this_month_dates = get_this_month_dates
    @tags = get_tags
    @layouts = get_layouts
    @key_buttons = get_key_buttons
  end

  def previous_month
    @previous_month_dates = get_previous_month_dates(params[:current_year].to_i, params[:current_month].to_i, params[:current_day].to_i)
    previous_date = Date.new(params[:current_year].to_i, params[:current_month].to_i, params[:current_day].to_i).last_month
    @current_year = previous_date.year
    @current_month = previous_date.month
    @current_day = previous_date.day
    render :previous_month
  end

  def next_month
    @next_month_dates = get_next_month_dates(params[:current_year].to_i, params[:current_month].to_i, params[:current_day].to_i)
    next_date = Date.new(params[:current_year].to_i, params[:current_month].to_i, params[:current_day].to_i).next_month
    @current_year = next_date.year
    @current_month = next_date.month
    @current_day = next_date.day
    render :next_month
  end

  private

  def get_this_month_dates
    dates = []
    today = DateTime.now
    first_date = DateTime.new(today.year, today.month, 1)

    DateTime.new(today.year, today.month, -1).day.times do
      date = { date: first_date.strftime("%Y-%m-%d"), day: first_date.day, wday: first_date.wday }
      dates.push(date)
      first_date += 1
    end

    return dates
  end

  def get_previous_month_dates(current_year, current_month, current_day)
    dates = []
    previous_date = DateTime.new(current_year, current_month, current_day).last_month
    first_date = DateTime.new(previous_date.year, previous_date.month, 1)

    DateTime.new(previous_date.year, previous_date.month, -1).day.times do
      date = { date: first_date.strftime("%Y-%m-%d"), day: first_date.day, wday: first_date.wday }
      dates.push(date)
      first_date += 1
    end

    return dates
  end

  def get_next_month_dates(current_year, current_month, current_day)
    dates = []
    next_date = DateTime.new(current_year, current_month, current_day).next_month
    first_date = DateTime.new(next_date.year, next_date.month, 1)

    DateTime.new(next_date.year, next_date.month, -1).day.times do
      date = { date: first_date.strftime("%Y-%m-%d"), day: first_date.day, wday: first_date.wday }
      dates.push(date)
      first_date += 1
    end

    return dates
  end

  def get_tags
    file = File.read(Rails.root.join('public', 'tags.json'))
    tags_json = JSON.parse(file)
    tags_json_sort = tags_json.sort_by { |tag| tag["sort_key"] }
    tags_array = []
    tags_json_sort.each do |tag|
      tags_array.push(tag['tag_name'])
    end

    return tags_array
  end

  def get_layouts
    file = File.read(Rails.root.join('public', 'layouts.json'))
    layouts_json = JSON.parse(file)
    layouts_json_sort = layouts_json.sort_by { |layout| layout["sort_key"] }
    layouts_array = []
    layouts_json_sort.each do |layout|
      layout_text = layout['layout']
      layout_text.gsub!("today", Date.today.strftime("%Y-%m-%d"))
      layout_text.gsub!("wday", Date.today.wday.to_s.gsub(/[0-6]/, '0' => '日', '1' => '月', '2' => '火', '3' => '水', '4' => '木', '5' => '金', '6' => '土'))
      layouts_array.push(layout_text)
    end

    return layouts_array
  end

  def get_key_buttons
    file = File.read(Rails.root.join('public', 'key_buttons.json'))
    key_buttons_json = JSON.parse(file)
    key_buttons_json_sort = key_buttons_json.sort_by { |key_button| key_button["sort_key"] }
    key_buttons_array = []
    key_buttons_json_sort.each do |key_button|
      key_buttons_array.push(key_button['content'])
    end

    return key_buttons_array
  end

end
