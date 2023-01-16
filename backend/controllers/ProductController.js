import ProductModel from "../models/ProductModel.js";
import cloudinery from "cloudinary";

// Creating A Product
export const CreateAProduct = async (req, res) => {
  try {
    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.image);
    } else {
      images = req.body.images;
    }

    const imageLinks = [];
    for (let index = 0; index < images.length; index++) {
      const result = cloudinery.v2.uploader.upload(images[index], {
        folder: "products",
      });

      imageLinks.push({
        public_id: result.public_id,
        url: (await result).secure_url,
      });
    }

    req.body.images = imageLinks;

    const product = await ProductModel.create(req.body);

    const { __v, ...info } = product._doc;

    res.status(200).json({ sucess: true, info });
  } catch (error) {
    console.log(error);
  }
};

// Deleting A Product
export const DeleteAProduct = async (req, res) => {
  try {
    const { id } = req.query;

    //
    const product = await ProductModel.findByIdAndDelete({ _id: id });

    if (!product) {
      return res
        .status(200)
        .json({ sucess: false, message: "Something Went Wrong." });
    }

    res
      .status(200)
      .json({ sucess: true, message: "Product Sucessfully Deleted." });
  } catch (error) {
    console.log(error);
  }
};

// Updating a Product
// Update Product Quantity
export const UpdateQuantity = async (req, res) => {
  try {
    const { id } = req.query;

    const { quantity } = req.body;

    // find the product
    const product = await ProductModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          quantity: quantity,
        },
      }
    );

    res.status(200).json({ sucess: true, product });
  } catch (error) {
    console.log(error);
  }
};

// Update Price
export const UpdatePrice = async (req, res) => {
  try {
    const { id } = req.query;

    const { price } = req.body;

    // find the product
    const product = await ProductModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          price: price,
        },
      }
    );

    res.status(200).json({ sucess: true, product });
  } catch (error) {
    console.log(error);
  }
};

//
export const UpdateTitleDesc = async (req, res) => {
  try {
    const { id } = req.query;

    const { title, description } = req.body;

    // find the product
    const product = await ProductModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          title: title,
          description: description,
        },
      }
    );

    res.status(200).json({ sucess: true, product });
  } catch (error) {
    console.log(error);
  }
};
export const UpdateImages = async (req, res) => {
  try {
    const { id } = req.query;
  } catch (error) {
    console.log(error);
  }
};

// Getting All Product
export const GetAllProduct = async (req, res) => {
  try {
    let { limit, page, sort } = req.query;

    switch (sort) {
      case "Relevance":
        sort = null;
        break;

      case "Price Ascending":
        sort = 1;
        break;

      case "Price Descending":
        sort = -1;
        break;
    }

    const skip = (page - 1) * 8;

    if (sort === null) {
      const products = await ProductModel.find().limit(limit).skip(skip).sort();
      if (products.length < 1) {
        return res.status(404).json("No Product Avalible");
      }

      const TotalProduct = await ProductModel.find();
      const productLength = TotalProduct.length;
      res.status(200).json({ sucess: true, products, productLength });
    }

    if (sort !== null) {
      const products = await ProductModel.find()
        .limit(limit)
        .skip(skip)
        .sort({ price: sort });

      if (products.length < 1) {
        return res.status(404).json("No Product Avalible");
      }

      const TotalProduct = await ProductModel.find();
      const productLength = TotalProduct.length;
      res.status(200).json({ sucess: true, products, productLength });
    }
  } catch (error) {
    console.log(error);
  }
};

// Get A Product
export const GetAProduct = async (req, res) => {
  try {
    // Geting the product Id
    const { id } = req.query;

    const product = await ProductModel.findById({ _id: id });
    if (!product) {
      return res
        .status(404)
        .json({ sucess: false, message: "Invalid Product Id" });
    }

    const { __v, ...others } = product._doc;

    res.status(200).json({ ...others });
  } catch (error) {
    console.log(error);
  }
};
