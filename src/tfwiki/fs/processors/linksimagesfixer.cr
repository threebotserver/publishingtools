require "markd"

module TfWiki
  class MyMDProcessor < Markd::HTMLRenderer
    property links = Array(String).new
    property images = Array(String).new

    def initialize(@options = Options.new)
      super.initialize
      @links = [] of String
      @images = [] of String
    end

    def link(node, entering)
      @links << node.data["destination"].as(String)
    end

    def image(node, entering)
      @images << node.data["destination"].as(String)
    end
  end

  class LinksImagesProcessor # < Processor
    def match(file_name)
      return File.extname(file_name) == ".md"
    end

    private def getlinks(content)
      options = Markd::Options.new(time: false)
      document = Markd::Parser.parse(content, options)
      renderer = MyMDProcessor.new(options)
      renderer.render(document)
      renderer
    end

    def process(path_obj, child)
      child_path = path_obj.join(child)
      content = File.read(child_path)
      processor = getlinks(content)
      links = processor.links
      images = processor.images
      p links, images
      links.each do |link|
        unless link.starts_with?("http")
          # on filesystem
          puts "old link is #{link}  and new link should be ", File.basename(link)
          content = content.gsub link, File.basename(link) if link != File.basename(link)
        end
      end
      images.each do |img|
        unless img.starts_with?("http")
          # on filesystem
          puts "old img is #{img}  and new img should be ", File.basename(img)
          content = content.gsub img, File.basename(img) if img != File.basename(img)
        end
      end
      if images.size > 0 || links.size > 0
        File.write(child_path, content)
      end
    end
  end
end