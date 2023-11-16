import { Button } from "react-bootstrap";
import StripeCheckout from "react-stripe-checkout";
import logo from "../assets/images/logo/logo.png";
import { useEffect, useState } from "react";
import { usePayOrderStripe } from "../orderhooks/usePayOrderStripe";

const StripeCheckoutButton = () => {
  const [stripeToken, setStripeToken] = useState(null);

  const { isCreating, createCardPayment } = usePayOrderStripe();

  const KEY =
    "pk_test_51O3iyKJHkbdms0kARX6u13xwDIrU0APjHbOpHXyARsiGqtemhuznBmUBrSr9gDrGU4VCRnzr4xeYQ39b5f73X3BC00VBSkCTLJ";

  function onToken(token) {
    console.log(token);
    setStripeToken(token);
    createCardPayment();
  }

  return (
    <StripeCheckout
      name="Art Shop"
      image={logo}
      billingAddress
      shippingAddress
      description="You total is £20"
      amount={2000}
      token={onToken}
      stripeKey={KEY}
    >
      <Button>Pay WITH CARD</Button>;
    </StripeCheckout>
  );
};

export default StripeCheckoutButton;
