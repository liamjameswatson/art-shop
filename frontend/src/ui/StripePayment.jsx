import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./StripeCheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { usePublishableStripeKey } from "../orderhooks/useStripePublishableKey";
import { useStripeSecretKey } from "../orderhooks/useStripeSecretKey";

//
function Payment() {
  const { data: publishableKey } = usePublishableStripeKey();
  const { data: secretKey } = useStripeSecretKey();

  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  console.log("pk ====", publishableKey?.publishableKey);
  console.log("sk ====", secretKey?.clientSecret);

  useEffect(() => {
    // Make sure both publishableKey and secretKey are available before setting state
    if (publishableKey && secretKey && typeof publishableKey === "string") {
      setStripePromise(loadStripe(publishableKey));
      setClientSecret(secretKey.clientSecret);
    }
  }, [publishableKey, secretKey]);

  // setStripePromise(publishableKey?.publishableKey)
  // setClientSecret(secretKey?.clientSecret)
  // console.log("pkey =", data);
  // console.log("sk =")

  // useEffect((publishableKey) => {
  //   // fetch("/config/stripe").then(async (r) => {
  //   //   const { publishableKey } = await r.json();
  //   //   // console.log(publishableKey)
  //   setStripePromise(loadStripe(publishableKey));
  //   console.log(" publishableKey", publishableKey);
  // }, []);

  // useEffect(() => {
  //   fetch("/api/create-payment-intent", {
  //     method: "POST",
  //     body: JSON.stringify({}),
  //   }).then(async (r) => {
  //     const { clientSecret } = await r.json();
  //     setClientSecret(clientSecret);
  //     console.log(clientSecret);
  //   });
  // }, []);

  return (
    <>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <Checkout />
        </Elements>
      )}
    </>
  );
}

export default Payment;
