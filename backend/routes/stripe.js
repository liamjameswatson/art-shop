import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
// import { ORDERS_URL } from "../../frontend/src/constants";
// require("dotenv").config();

dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  const { userId, cartItems } = req.body;
  const line_items = cartItems.map((item) => {
     
    return {
      price_data: {
        currency: "gbp",
        product_data: {
          name: item.name,
          images: [`${process.env.CLIENT_URL}${item.image}`],
          metadata: {
            id: item.id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });

   
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

 
  // res.redirect(303, session.url);    // This is for submit a form

  res.send({ url: session.url });
});

export default router;
