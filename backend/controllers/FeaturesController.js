import ProductModel from "../models/ProductModel.js";
import UserModel from "../models/userModels.js";

// Search Func
export const SearchFunc = async (req, res) => {
  try {
    const q = req.query.q;

    const { limit, page } = req.query;

    const skip = (page - 1) * 8;

    if (q.length < 2) {
      return res
        .status(404)
        .json("Product Name Should Be Minimum 3 Characters");
    }

    const result = await ProductModel.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { catagory: { $regex: q, $options: "i" } },
      ],
    })
      .limit(limit)
      .skip(skip);

    if (result.length === 0) {
      return res.status(404).json("No Product Found");
    }

    const Result = await ProductModel.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { catagory: { $regex: q, $options: "i" } },
      ],
    });

    const ResultLen = Result.length;
    res.status(200).json({ result, ResultLen });
  } catch (error) {
    console.log(error);
  }
};

/// Address Update
export const AdressUpdate = async (req, res) => {
  try {
    //  Getting the info
    let { AdressLine, city, state, zipCode, phone, id, country } = req.body;

    // Getting the user
    const User = await UserModel.findById(id);
    await User.update({
      $set: {
        userAdress: { AdressLine, city, state, zipCode, phone, country },
      },
    });

    let { password, __v, ...other } = User._doc;
    res.status(200).json({ ...other });
  } catch (error) {
    console.log(error);
  }
};

// Write A Review
export const WriteAReview = async (req, res) => {
  try {
    const { id } = req.query;
    const { userId, rating, revDesc } = req.body;

    // finding the Productn
    const product = await ProductModel.findById({ _id: id });

    // updating the users reviews as well
    const user = await UserModel.findById({ _id: userId }).select("-password");

    // updating the product
    await product.updateOne({
      $push: {
        review: {
          user: user,
          revDesc: revDesc,
          rating: rating,
        },
      },
    });

    // updating the user Review
    await user.updateOne({
      $push: {
        review: {
          products: product,
          revDesc: revDesc,
          rating: rating,
        },
      },
    });

    const { review, ...other } = product._doc;

    res.status(200).json({ sucess: true, review });
  } catch (error) {
    console.log(error);
  }
};

// Get All Review
export const GetAllReview = async (req, res) => {
  // getting the product
  try {
    const id = req.query.id;

    // Finding the product
    const product = await ProductModel.findById({ _id: id });

    const { review, ...others } = product._doc;

    res.status(200).json({ sucess: true, review });
  } catch (error) {
    console.log(error);
  }
};

// GetProductByCAtagory
export const GetProductByCAtagory = async (req, res) => {
  try {
    const { catagory, page, limit } = req.query;

    const skip = (page - 1) * 8;

    // Finding the product
    const product = await ProductModel.find({
      catagory: {
        $regex: catagory,
        $options: "i",
      },
    })
      .limit(limit)
      .skip(skip);

    const pro = await ProductModel.find({
      catagory: {
        $regex: catagory,
        $options: "i",
      },
    });

    const proLen = pro.length;

    if (product === 0) {
      res
        .status(200)
        .json({ sucess: false, message: "No Product Found For This Catagory" });
    }

    res.status(200).json({ sucess: true, product, proLen });
  } catch (error) {
    console.log(error);
  }
};
