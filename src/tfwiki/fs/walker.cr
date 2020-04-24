require "./processor"
require "./processors/*"

module TfWiki
  class FInfoTracker
    property count = 0
    property paths = [""]

    def to_s
      "FInfoTracker #{count} "
    end
  end

  class Walker
    def initialize
      @all_names = Set(String).new
      @imgdirrenamer = ImagesDirProcessor.new
      @img = ImageProcessor.new
      @md = MdProcessor.new
      @readme = ReadMeProcessor.new
      @linksimagesfixer = LinksImagesProcessor.new
      @skips = [".git", "_archive", "out"]
      @errors = [] of String
      @dirfilesinfo = Hash(String, FInfoTracker).new
      # {filename => {count: 5, paths=[] }}
    end

    def errors
      @errors
    end

    def errors_as_md(path)
      content = ""
      @errors.each do |err|
        content = content + "# #{err} \n"
      end
      File.write(File.join(path, "errors.md"), content)
    end

    def should_skip?(path)
      basename = File.basename(path)
      if @skips.includes?(basename)
        puts "skipping #{basename}"
        return true
      end
    end

    def check_dups(path)
      if should_skip?(path)
        return
      end
      path_obj = Path.new(path)
      Dir.each_child path do |child|
        child_path = path_obj.join(child)
        if Dir.exists?(child_path) && child.downcase == "images"
          #   puts "++++will rename #{child_path} to #{path_obj.join("img").to_s}"
          File.rename(child_path.to_s, path_obj.join("img").to_s)
        end
        if Dir.exists? child_path
          next if child.downcase == "img"
          check_dups child_path.to_s
        elsif @readme.match(child)
          child = "#{child_path.parent.basename}.md"
        end
        if !@dirfilesinfo.has_key?(child.to_s)
          finfo = FInfoTracker.new
          finfo.count = 1
          finfo.paths = [child_path.to_s]
          @dirfilesinfo[child] = finfo
        else
          finfo = @dirfilesinfo[child]
          finfo.count += 1
          finfo.paths << child_path.to_s
          @dirfilesinfo[child] = finfo
        end

        @dirfilesinfo.each do |filename, theinfo|
          if theinfo.count > 1
            # puts theinfo
            theinfo.paths.each do |dup_path|
              @errors << "- #{filename} existed #{theinfo.count.to_s} times. in paths #{theinfo.paths}"
            end
          end
        end
      end
    end

    def fixer(path)
      if should_skip?(path)
        return
      end
      path_obj = Path.new(path)
      Dir.each_child path do |child|
        if child[0] != "."
          begin
            child_path = path_obj.join(child)
            if Dir.exists? child_path
              if child.downcase == "img"
                next
              end
              fixer child_path.to_s
            else
              if @linksimagesfixer.match(child)
                puts "here.."
                @linksimagesfixer.process(path_obj, child)
              end
              if @imgdirrenamer.match(child)
                @imgdirrenamer.process(path_obj, child)
              end
              if @readme.match(child)
                @readme.process(path_obj, child)
              end
              if @linksimagesfixer.match(child)
                @linksimagesfixer.process(path_obj, child)
              end
              if @img.match(child)
                @img.process(path_obj, child)
              end
              if @md.match(child)
                @md.process(path_obj, child)
              end
            end
          rescue ex
            puts ex
          end
        end
      end
    end
  end
end