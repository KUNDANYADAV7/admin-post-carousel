import mongoose, { mongo } from "mongoose";
import { Blog } from "../models/blog.model.js";
import { v2 as cloudinary } from "cloudinary";
import slugify from "slugify";




export const createBlog = async (req, res) => {
  try {
    if (!req.files || !req.files.blogImage) {
      return res.status(400).json({ message: "Blog Image is required" });
    }

    const { blogImage } = req.files;
    if (!blogImage.mimetype.startsWith("image/")) {
      return res.status(400).json({ message: "Invalid file type. Only images are allowed" });
    }

    const { title, category, about } = req.body;
    if (!title || !category || !about) {
      return res.status(400).json({ message: "Title, category & about are required fields" });
    }
    if (about.length < 200) {
      return res.status(400).json({ message: "The 'About' section must contain at least 200 characters" });
    }

    const adminName = req.user?.name;
    const adminPhoto = req.user?.photo?.url;
    const createdBy = req.user?._id;

    // **Generate Slug (Ensure Unique)**
    let slug = slugify(title, { lower: true, strict: true });
    let existingBlog = await Blog.findOne({ slug });
    
    // If slug exists, append a number to make it unique
    let count = 1;
    while (existingBlog) {
      slug = slugify(`${title}-${count}`, { lower: true, strict: true });
      existingBlog = await Blog.findOne({ slug });
      count++;
    }

    // **Upload Image to Cloudinary (Async)**
    const cloudinaryResponse = await cloudinary.uploader.upload(blogImage.tempFilePath, {
      folder: "blog-images",
      quality: "auto",
      resource_type: "image",
    });

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      return res.status(500).json({ error: "Failed to upload image" });
    }

    // **Create Blog Data**
    const blogData = {
      title,
      slug,  // Add the generated slug
      about,
      category,
      adminName,
      adminPhoto,
      createdBy,
      blogImage: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
    };

    const blog = await Blog.create(blogData);

    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};







export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  await blog.deleteOne();
  res.status(200).json({ message: "Blog deleted successfully" });
};

export const getAllBlogs = async (req, res) => {
  const allBlogs = await Blog.find();
  res.status(200).json(allBlogs);
};



export const getSingleBlogs = async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};



export const getMyBlogs = async (req, res) => {
  const createdBy = req.user._id;
  const myBlogs = await Blog.find({ createdBy });
  res.status(200).json(myBlogs);
};





export const updateBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Blog ID" });
  }

  try {
    const { title, category, about } = req.body;

    if (!title || !category || !about) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (about.length < 200) {
      return res.status(400).json({ message: "About should contain at least 200 characters!" });
    }

    let updateData = {
      title,
      category,
      about,
      slug: slugify(title, { lower: true, strict: true }), // Generate slug
    };

    if (req.files?.blogImage) {
      const file = req.files.blogImage;
      const cloudinaryResponse = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "blog-images",
        quality: "auto",
      });

      updateData.blogImage = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      };
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog updated successfully", updatedBlog });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", details: error.message });
  }
};








