import { useEffect, useState } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { Button } from "react-bootstrap";

import { usePayOrderWithPayPal } from "../orderhooks/useEditOrder";
import { getPayPalClientId } from "../orderhooks/orderHooksApi";

import { usePayPalClientId } from "../orderhooks/usePayPalClientId";
import { useNavigate } from "react-router-dom";
import { ORDERS_URL } from "../constants";


function PayPalCheckout({ order, user }, onPayment) {
  const navigate = useNavigate();

  const {
    data: paypalClient,
    isLoading: IsLoadingClient,
    error: paypalClientError,
  } = usePayPalClientId();

  const { payOrder, isLoading: isPaying } = usePayOrderWithPayPal();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  useEffect(() => {
    if (!paypalClientError && !IsLoadingClient && paypalClient) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            clientId: paypalClient,
            currency: "GBP",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          // if not already loaded
          loadPayPalScript();
        }
      }
    }
  }, [paypalClientError, IsLoadingClient, order, paypalClient, paypalDispatch]);

  function handleApprove() {
    setIsPaid(true);
    navigate(`/checkout-success`);
  }

  return (
    <>
      <PayPalButtons
        style={{
          color: "silver", //gold, blue, silver, black, white
          layout: "horizontal",
          height: 48,
          tagline: false,
          shape: "pill",
        }}
        //   onClick={(data, actions) => {

        //   }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: order.totalPrice,
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order.capture();

          handleApprove(data.orderID);
        }}
        onError={(error) => {
          // handle Error
          // Display the error message, modal or cancel page or back to basket
        }}
        onCancel={() => {
          // Display the cancel message, modal or cancel page or back to basket
        }}
      />
      {/* <Button
        onClick={() => {
          getPayPalClientId;
        }}
      >
        GET ID
      </Button> */}
    </>
  );
}
export default PayPalCheckout;
