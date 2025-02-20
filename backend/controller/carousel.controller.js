import mongoose from "mongoose";
import { Carousel } from "../models/carousel.model.js";
import { v2 as cloudinary } from "cloudinary";

export const createCarouselItem = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: "Carousel image is required" });
    }
    
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const imageFile = req.files.image;
    const uploadResponse = await cloudinary.uploader.upload(imageFile.tempFilePath, {
      folder: "carousel-images" // Save images in 'carousel-images' folder in Cloudinary
    });
    
    const newItem = await Carousel.create({
      title,
      description,
      image: {
        public_id: uploadResponse.public_id,
        url: uploadResponse.secure_url,
      },
    });

    res.status(201).json({ message: "Carousel item created successfully", newItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getAllCarouselItems = async (req, res) => {
  try {
    const items = await Carousel.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCarouselItem = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    
    const item = await Carousel.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateCarouselItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    let imageUrl = null;

    if (req.files && req.files.image) {
      const uploadResponse = await cloudinary.uploader.upload(req.files.image.tempFilePath);
      imageUrl = uploadResponse.secure_url;
    }

    const updateData = { title, description, ...(imageUrl && { image: { url: imageUrl } }) };
    const updatedItem = await Carousel.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteCarouselItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Carousel.findById(id);
    
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    
    await item.deleteOne();
    res.status(200).json({ message: "Carousel item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
