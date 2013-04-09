OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, GOOGLE_CONFIG['app_id'], GOOGLE_CONFIG['secret'],
	{
	 :scope => "userinfo.email,userinfo.profile",
	 :approval_prompt => "auto",
	 :client_options => {ssl: {ca_file: Rails.root.join('lib/assets/cacert.pem').to_s}}
	}
end