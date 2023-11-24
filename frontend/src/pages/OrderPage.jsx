// import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import Message from "../ui/Message";
import Spinner from "../ui/Spinner";

// import StripeCheckoutButton from "../ui/StripeCheckout";

import { usePayOrderWithPayPal } from "../orderhooks/useEditOrder";

import { useUpdateOrder } from "../orderhooks/useUpdateOrder";

import { useUser } from "../userHooks/useUser";

import PayPalCheckout from "../ui/PayPalCheckout";

import { useOrder } from "../orderhooks/useOrder";
import OrderSummary from "../ui/OrderSummary";
import { useEffect, useState } from "react";
import StripePayment from "../ui/StripePayment";
import StripePayButton from "../ui/StripePayButton";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PaymentButtons from "../ui/PaymentButtons";

const OrderPage = () => {
  const [paymentMethod, setPaymentMethod] = useState(null);

  const navigate = useNavigate();

  const { id: orderId } = useParams();
  const { data, isLoading, error } = useOrder(orderId);

  const order = data?.order;

  const { updateOrder } = useUpdateOrder();

  const {
    user,
    deliveryAddress,
    deliveryPrice,
    orderItems,
    itemsPrice,
    taxPrice,
    totalPrice,
    isPaid,
    isDelivered,
  } = data?.order || {};

  if (isLoading) return <Spinner />;
  if (error) {
    return (
      <Message variant="danger">{error.error || "Order not found"}</Message>
    );
  }

  return (
    <>
      <h1>Order</h1>
      <Row>
        <Col sm={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Delivery</h2>
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email: </strong> {user.email}
              </p>
              <p>
                <strong>Address: </strong> {deliveryAddress.address},{" "}
                {deliveryAddress.city}, {deliveryAddress.postcode},{" "}
                {deliveryAddress.country}
              </p>
              {isDelivered ? (
                <Message variant="success">
                  {/* Delivered on {deliveredAt} */}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered yet</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {orderItems?.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={3} sm={3} xs={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col>
                      {" "}
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={4} sm={4} xs={4}>
                      {" "}
                      {item.quantity} x £{item.price} = £
                      {item.quantity * item.price}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col sm={4}>
          <OrderSummary order={data?.order} />
          {/* If order not paid  */}
          {!isPaid && (
            <PaymentButtons order={order} user={user} orderId={orderId} />
          )}
          {isPaid && <h1> You have paid for this order</h1>}

          {/* {loadingDeliver && <Spinner />} */}

          {/* {userInfo &&
                userInfo.role == "admin" &&
                order.isPaid &&
                !order.isDelivered && (
                   <ListGroup.Item>
                     <Button
                       className="btn btn-block"
                       type="button"
                       onClick={handleDeliverOrder}
                       // onClick={handleDeliverOrder}
                       >
                       Mark As Delivered
                     </Button>
                   </ListGroup.Item>
                )} */}
          {/* </ListGroup> */}
          {/* </Card>  */}
        </Col>
      </Row>
    </>
  );
};

export default OrderPage;
