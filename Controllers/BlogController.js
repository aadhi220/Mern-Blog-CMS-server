const Blog =require('../Models/blogSchema');

exports.addBlog =async (req,res)=>{
    console.log("inside addBlog",req.body);

const {userId,title,caption,category,content,username,created_at ,likes,views }=req.body;
const images = req.files.map(file => file.filename);

try {
    const newBlog = new Blog({
        title: title,
        caption: caption,
        category:category,
        images: images,
        content: content,
        userId: userId,
        username: username,
        created_at: created_at,
        likes: likes,
        views: views
    });

    await newBlog.save();
    res.status(200).json({ message: "Blog added successfully" });
} catch (error) {
    console.error('Error adding blog:', error);
    res.status(500).json({ message: "Error adding blog" });
}
}

exports.getAllBlog =async (req,res)=>{ 
    const searchKey = req.query.search;
    const query = {
        title: { $regex: searchKey, $options: "i" },
      };
    try{
        const blogs =await Blog.find(query);
        res.status(200).json(blogs);

    }catch(error){
        res.status(500).json({message:error})
    }
}

exports.deleteBlog =async (req,res)=>{
    const blogId = req.params.id;
    try{
        const blog =await Blog.findByIdAndDelete({_id:blogId});
        res.status(200).json(blog);
    }catch(error){
        res.status(500).json({message:error})
    }
}