module UserHelper
    def user_list_builder
        setup = {}
        user_array = []
        User.all.each do |e|
            user_array << {
                name: e.name,
                email: e.email,
                id: e.id,
                role: e.role
            }
        end
        setup[:users] = user_array
        setup.to_json.html_safe
    end
end
