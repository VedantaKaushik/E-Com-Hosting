import OrderModel from "../models/OrderModel.js";
import productModel from "../models/ProductModel.js";

// create a order
export const createAOrder = async (req, res) => {
  try {
    const data = req.body.data;

    const { Product, userInfo, priceTotal } = data;

    // getting the product and decreasing the quantity
    if (Product.length > 1) {
      for (let index = 0; index < Product.length; index++) {
        const _id = Product.map((e) => e._id)[index];

        const Quantity = Product.map((e) => e.cartQuantity)[index];

        const product = await productModel.findById({ _id });

        const UQuantity = product.quantity - Quantity;

        if (UQuantity < 0) {
          return res.status(200).json({
            sucess: false,
            message: `${product.quantity} Product Left In Stock`,
          });
        }

        await product.updateOne({
          $set: {
            quantity: UQuantity,
          },
        });
      }
    }

    if (Product.length === 1) {
      const _id = Product.map((e) => e._id);

      const Quantity = Product.map((e) => e.cartQuantity);

      const product = await productModel.findById({ _id });

      const UQuantity = product.quantity - Quantity;

      if (UQuantity < 0) {
        return res.status(200).json({
          sucess: false,
          message: `${product.quantity} Product Left In Stock`,
        });
      }

      await product.updateOne({
        $set: {
          quantity: UQuantity,
        },
      });
    }

    // Creating the order
    const orderTotal = priceTotal;
    const order = await OrderModel.create({ Product, userInfo, orderTotal });

    const { _id, ...info } = order;

    res.status(200).json({ sucess: true, message: "Order Sucessfull", _id });
  } catch (error) {
    console.log(error);
  }
};

// track order
export const trackOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (orderId.length !== 24) {
      return res
        .status(200)
        .json({ sucess: false, message: "Invalid Order Id" });
    }

    // Finder the order
    const order = await OrderModel.findById({ _id: orderId });
    if (!order) {
      return res
        .status(200)
        .json({ sucess: false, message: "Invalid Order Id" });
    }

    res.status(200).json({ sucess: true, order });
  } catch (error) {
    console.log(error);
  }
};

// get All Orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find();

    if (orders.length === 0) {
      return res.status(200).json({ sucess: false, message: "No Order Found" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
  }
};

// Get a Order
export const getAOrder = async (req, res) => {
  try {
    const { orderId } = req.query;

    // Find the order
    const order = await OrderModel.findById(orderId);

    const { __v, ...others } = order._doc;

    res.status(200).json(others);
  } catch (error) {
    console.log(error);
  }
};

// Update A Order Status
export const updateAOrder = async (req, res) => {
  try {
    const { id } = req.query;

    const { uStatus, uRemarks } = req.body;

    // Finding the order
    const order = await OrderModel.findById(id);

    const uOrder = await order.updateOne({
      $set: { status: uStatus, remarks: uRemarks },
    });

    res.status(200).json({ uOrder });
  } catch (error) {
    console.log(error);
  }
};

// Filter Order
export const FilterOrder = async (req, res) => {
  try {
    // Getting The Query
    const { q } = req.query;

    const filterOrder = await OrderModel.find({ status: { $eq: q } });

    res.status(200).json({ filterOrder });
  } catch (error) {
    console.log(error);
  }
};
