import { ListGroup, Button } from "react-bootstrap";
import PayPalCheckout from "./PayPalCheckout";
import StripePayButton from "./StripePayButton";
import { useUpdateOrder } from "../orderhooks/useUpdateOrder";
import { useNavigate } from "react-router-dom";

function PaymentButtons({ order, user, orderId }) {
  const { orderItems, deliveryAddress } = order;

  const { updateOrder } = useUpdateOrder();

  const navigate = useNavigate();

  function handleTestPayment() {
    console.log("testing");
    const paymentMethod = "stripe";
    updateOrder({ paymentMethod, orderId });
    navigate("/checkout-success");
  }
  return (
    <>
      <ListGroup.Item>
        <PayPalCheckout
          order={order}
          // onPayment={handlecreateOrder}
          user={user}
        />
        <StripePayButton
          user={user}
          orderItems={orderItems}
          deliveryAddress={deliveryAddress}
        />
      </ListGroup.Item>
      <ListGroup.Item>
        {" "}
        <Button
          onClick={() => {
            handleTestPayment();
          }}
        >
          Test Pay
        </Button>
      </ListGroup.Item>
    </>
  );
}

export default PaymentButtons;
