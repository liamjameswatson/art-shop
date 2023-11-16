import { Form, Button, Row, Col } from "react-bootstrap";
import { useCheckoutSession } from "../orderhooks/useCheckoutSession";
// import {createCheckoutSession} from '../orderhooks/useCheckoutSession'

import React from "react";

const StripePayButton = ({ orderItems, user, deliveryAddress }) => {
  const { isCreatingSession, createSession, error } = useCheckoutSession();
  function handleCheckout() {
    createSession({ orderItems, user });
  }

  return <Button onClick={() => handleCheckout()}>StripePayButton</Button>;
};

export default StripePayButton;
