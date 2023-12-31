const Blog = require("../Models/blogSchema");

exports.addBlog = async (req, res) => {
  console.log("inside addBlog", req.body);

  const {
    userId,
    title,
    caption,
    category,
    content,
    username,
    created_at,
    likes,
    views,
    approved,
    profilePic
  } = req.body;
  const images = req.files.map((file) => file.filename);

  try {
    const newBlog = new Blog({
      title: title,
      caption: caption,
      category: category,
      images: images,
      content: content,
      userId: userId,
      username: username,
      created_at: created_at,
      likes: likes,
      views: views,
      approved: approved,
      profilePic:profilePic,
    });

    await newBlog.save();
    res.status(200).json({ message: "Blog added successfully" });
  } catch (error) {
    console.error("Error adding blog:", error);
    res.status(500).json({ message: "Error adding blog" });
  }
};

exports.editBlog = async (req, res) => {
  console.log("inside editBlog", req.body);

  const { title, caption, category, content, created_at, blogId ,approved} = req.body;
  const images = req.files.map((file) => file.filename);

  try {
    const updatedBlog = await Blog.findById(blogId);

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    updatedBlog.title = title;
    updatedBlog.caption = caption;
    updatedBlog.category = category;
    updatedBlog.content = content;
    updatedBlog.created_at = created_at;
    updatedBlog.approved = approved;
    // Update images only if they are provided in the request
    if (images.length > 0) {
      updatedBlog.images = images;
    }

    await updatedBlog.save();
    res.status(200).json({ message: "Blog updated successfully", updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Error updating blog" });
  }
};

exports.getAllBlog = async (req, res) => {
  console.log("inside get all blog");
  const searchKey = req.query.search;
  const query = {
    title: { $regex: searchKey, $options: "i" },
  };
  try {
    const blogs = await Blog.find(query);
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getAuthorBlog = async (req, res) => {
  console.log("inside get all blog");
  const searchKey = req.query.search;
  const query = {
    username: { $regex: searchKey, $options: "i" },
  };
  try {
    const blogs = await Blog.find(query);
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getBlogById = async (req, res) => {
  const blogId = req.params.id;
  try {
    const blog = await Blog.findById({ _id: blogId });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.deleteBlog = async (req, res) => {
  const blogId = req.params.id;
  try {
    const blog = await Blog.findByIdAndDelete({ _id: blogId });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.setViewCount = async (req, res) => {
  const { id, count } = req.body;

  try {
    const setView = await Blog.findByIdAndUpdate(
      { _id: id },
      { $set: { views: count } },
      { new: true }
    );

    if (!setView) {
      // If the blog with the given ID is not found
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(setView);
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error updating view count:", error);

    // Handle different types of errors
    if (error.name === "CastError") {
      // Handle invalid ID format
      return res.status(400).json({ message: "Invalid blog ID" });
    }

    // Generic error response for other types of errors
    res.status(500).json({ message: "Internal server error" });
  }
};
