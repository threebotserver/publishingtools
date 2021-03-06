module TFWeb
  module API
    module Auth
      @@OAUTH_URL = "https://oauth.threefold.io"
      @@REDIRECT_URL = "https://login.threefold.me"
      @@wikis : Hash(String, Wiki) = TFWeb::Config.wikis
      @@websites : Hash(String, Website) = TFWeb::Config.websites

      before_get "/:name" do |env|
        if env.params.url.has_key?("name")
          name = env.params.url["name"]
        else
          next
        end

        obj = Site.new_empty
        if @@wikis.has_key?(name)
          obj = @@wikis[name].not_nil!
        elsif @@websites.has_key?(name)
          obj = @@websites[name].not_nil!
        end

        if obj.auth && env.session.bool?("auth_#{name}") != true
          env.session.string("request-uri", env.request.path)
          env.session.string("sitename", name)
          Logger.info { "will authenticate using 3bot connect." }
          env.redirect "/auth/login"
        else
          if obj.auth
            theuser = env.session.string("username")
            if obj.user_can_access?(theuser) # invalidate immediately
              Logger.info { "already authenticated .." }
            else
              env.response.status_code = 401
              env.response.print "unauthorized to access #{name}"
              env.response.close
            end
          end
        end
      end

      get "/auth/login" do |env|
        state = UUID.random.to_s.gsub('-', "")
        env.session.string("state", state)
        res = HTTP::Client.get "#{@@OAUTH_URL}/pubkey"
        if !res.success?
          env.response.status_code = 500
          env.response.print "Unexpected error while contacting Oauth server, error code was #{res.status_code}"
        end
        data = JSON.parse(res.body)
        data["publickey"].to_s
        params = {
          "state":       state,
          "appid":       env.request.headers["host"],
          "scope":       {"user": true, "email": true}.to_json,
          "redirecturl": "/auth/callback",
          "publickey":   data["publickey"].to_s,
        }
        params = HTTP::Params.encode(params)
        env.redirect "#{@@REDIRECT_URL}?#{params}"
      end

      get "/auth/callback" do |env|
        data = env.params.query["signedAttempt"]
        state = env.session.string?("state") || ""
        res = HTTP::Client.post("#{@@OAUTH_URL}/verify", form: {"signedAttempt" => data, "state" => state})
        if !res.success?
          env.response.status_code = res.status_code
          env.response.print "Oauth server aborted and returned with: #{res.status_message}"
        end
        body = JSON.parse(res.body)
        username = body["username"].to_s
        email = body["email"].to_s
        env.session.string("username", username)
        env.session.string("email", email)
        sitename = env.session.string("sitename")

        env.session.bool("auth_#{sitename}", true)
        obj = Site.new_empty
        if @@wikis.has_key?(sitename)
          obj = @@wikis[sitename].not_nil!
        elsif @@websites.has_key?(sitename)
          obj = @@websites[sitename].not_nil!
        end

        Logger.debug { "checking for #{username} access on #{obj.name}" }
        if obj.not_nil!.user_can_access?(username)
          Logger.info { "user #{username} can access #{obj.name}" }
          env.redirect env.session.string("request-uri")
        else
          tfwebaccesspath = Path["~/tfweb.access"].expand(home: true).to_s
          unless File.exists?(tfwebaccesspath)
            File.touch(tfwebaccesspath)
          end
          prev = File.read(tfwebaccesspath)
          prev_uniq = prev.lines.uniq.join("\n")
          updated = prev_uniq + "\n" + "#{username}:#{sitename}"
          File.write(tfwebaccesspath, updated)

          env.response.status_code = 401
          env.response.print "unauthorized to access #{sitename}"
          env.response.close
        end
      end
    end
  end
end
