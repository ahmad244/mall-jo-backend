import { Router } from "express";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from "./verifyToken.js";

const router = Router();

//GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.aggregate([
      {
        $match: {
          userId: req.params.userId,
        },
      },
      {
        $unwind: "$products",
      },
      {
        $lookup: {
          from: "Product",
          localField: "products.productId",
          foreignField: "_id",
          as: "newProducts.product",
        },
      },
    ]);

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ADD TO CART
router.post("/add", verifyToken, async (req, res) => {
  const userId = req.body.userId;
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  const productSpecs = req.body.productSpecs;

  try {
    // Check if cart exists for the user
    let cart = await Cart.findOne({ userId });
    const product = await Product.findOne({ productId });
    if (product && product.inStock === true) {
      if (cart) {
        // Cart exists, add product to cart
        // Check if product exists in cart already
        const itemIndex = cart.products.findIndex((p) => {
          if (p.productId !== productId) {
            return false;
          }

          const currentProductSpecs = p.productSpecs;

          if (
            Object.keys(currentProductSpecs).length !==
            Object.keys(productSpecs).length
          ) {
            return false;
          }

          for (const key of Object.keys(productSpecs)) {
            if (!(key in currentProductSpecs)) {
              return false;
            }

            if (currentProductSpecs[key] !== productSpecs[key]) {
              return false;
            }
          }

          return true;
        });

        if (itemIndex > -1) {
          // Product exists in the cart, update the quantity
          let productItem = cart.products[itemIndex];
          productItem.quantity += quantity;
          cart.products[itemIndex] = productItem;
        } else {
          // Product does not exist in cart, add new item
          cart.products.push({
            productId: productId,
            productSpecs: productSpecs,
            quantity: quantity,
          });
        }
        cart = await cart.save();
        return res.status(200).json(cart);
      } else {
        // No cart for user, create new cart
        const newCart = await Cart.create({
          userId,
          products: [
            {
              productId: productId,
              productSpecs: productSpecs,
              quantity: quantity,
            },
          ],
        });
        return res.status(201).json(newCart);
      }
    } else {
      return res.status(400).json("Product is out of stock");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Something went wrong");
  }
});

export default router;
