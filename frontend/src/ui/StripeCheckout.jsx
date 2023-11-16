// import { loadStripe } from "@stripe/stripe.js";
import { useStiripeKey } from "../orderhooks/useStripeKey";
import { useGetPaymentIntent } from "../orderhooks/useGetPaymentIntent";
import React, { useState } from "react";

const StripeCheckout = (props) => {
  const { data: stripeKey } = useStiripeKey();
  const { data: paymentIntent } = useGetPaymentIntent();
  console.log("stripekeyyyyyyyyy = ", stripeKey);
  console.log("paaaayyyyyyyyyyyyyy =", paymentIntent);
  const [stripePayment, setStripePayment] = useState(null);
  return <div>StripeCheckout</div>;
};

export default StripeCheckout;
