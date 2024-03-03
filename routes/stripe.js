import { Router } from "express";
import stripePackage from "stripe";

const router = Router();

// Set the Stripe API key
const KEY = process.env.STRIPE_KEY;
const stripe = stripePackage(KEY);
router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

export default router;
