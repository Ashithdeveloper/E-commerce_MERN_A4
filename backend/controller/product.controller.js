import Product from "../model/product.model.js";
import { v2 as cloudinary } from "cloudinary";

//For creating a new product
export const createProduct = async (req, res) => {
  try {
    const {
      productname,
      description,
      category,
      subcategory,
      bestseller: rawBestseller,
      date,
    } = req.body;
    const sizes = JSON.parse(req.body.sizes);
    const price = Number(req.body.price);

    const bestseller =
      rawBestseller === "true"
        ? true
        : rawBestseller === "false"
        ? false
        : rawBestseller;

    if (
      !productname ||
      !price ||
      !description ||
      !category ||
      isNaN(price) ||
      !subcategory ||
      !sizes
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all the fields properly" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }
    const images = [];
    if (req.files?.image1) images[0] = req.files.image1[0].path;
    if (req.files?.image2) images[1] = req.files.image2[0].path;
    if (req.files?.image3) images[2] = req.files.image3[0].path;
    if (req.files?.image4) images[3] = req.files.image4[0].path;

    const filteredImages = images.filter(Boolean);

    const newProduct = new Product({
      productname,
      price,
      description,
      category,
      subcategory,
      sizes,
      bestseller,
      date,
      image: filteredImages,
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product created successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

//For getting a single product
export const getOneProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ message: "Please provide a valid product id" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product, message: "Product found successfully" });
  } catch (error) {
    console.log(error);
  }
};
//For getting all products
export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ products, message: "Products found successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//For deleting a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ message: "Please provide a valid product id" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete images from Cloudinary
    if (product.image?.length > 0) {
      for (const img of product.image) {
        if (img.public_id) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      }
    }

    await Product.findByIdAndDelete(id);

    res
      .status(200)
      .json({ message: "Product and images deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error during deletion" });
  }
};
//For updating a product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const {
      productname,
      price,
      description,
      category,
      subcategory,
      bestseller,
      date,
    } = req.body;
    const sizes = JSON.parse(req.body.sizes);

    if (productname !== undefined) {
      product.productname = productname;
    }
    if (price !== undefined) {
      product.price = Number(price);
    }
    if (description !== undefined) {
      product.description = description;
    }
    if (category !== undefined) {
      product.category = category;
    }

    const currentImages = product.image || ["", "", "", ""];
    const updatedImages = [...currentImages];

    if (req.files?.image1) updatedImages[0] = req.files.image1[0].path;
    if (req.files?.image2) updatedImages[1] = req.files.image2[0].path;
    if (req.files?.image3) updatedImages[2] = req.files.image3[0].path;
    if (req.files?.image4) updatedImages[3] = req.files.image4[0].path;

    product.image = updatedImages.filter(Boolean);

    if (subcategory !== undefined) {
      product.subcategory = subcategory;
    }
    if (sizes !== undefined) {
      product.sizes = sizes;
    }
    if (bestseller !== undefined) {
      product.bestseller = bestseller === "true";
    }
    if (date !== undefined) {
      product.date = date;
    }

    await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Server error while updating product" });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: "Search query is missing" });
    }

    const regex = new RegExp(q, "i");
    const products = await Product.find({
      $or: [
        { productname: { $regex: regex } },
        { description: { $regex: regex } },
        { category: { $regex: regex } },
        { subcategory: { $regex: regex } },
      ],
    });

    res.status(200).json({ products });
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
