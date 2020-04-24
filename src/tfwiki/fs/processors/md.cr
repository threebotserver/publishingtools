module TfWiki
  class MdProcessor # < Processor
    def match(file_name)
      return File.extname(file_name) == ".md"
    end

    def process(path_obj, child)
      child_path = path_obj.join(child)
      clean_child = child.downcase.gsub({" ": "_"})
      new_path = path_obj.join(clean_child)
      puts "[md]renaming #{child_path.to_s} to #{new_path.to_s} "
      File.rename(child_path.to_s, new_path.to_s) if clean_child != child_path.to_s
    end
  end
end