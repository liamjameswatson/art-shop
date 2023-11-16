import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../redux/basketSlice";
import { Form, Col, Button } from "react-bootstrap";
import FormContainer from "../ui/FormContainer";
import Steps from "../ui/Steps";

// ... (imports remain unchanged)

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { deliveryAddress, paymentMethod: paymentMethodValue } = useSelector(
    (state) => state.basket
  );

  console.log(paymentMethodValue);

  const [paymentMethod, setPaymentMethod] = useState(
    paymentMethodValue || "Card"
  );

  useEffect(() => {
    if (!deliveryAddress) {
      navigate("/checkout");
    }
  }, [deliveryAddress, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeOrder");
  };

  return (
    <FormContainer>
      <Steps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Select Method</Form.Label>
          <Col>
            <Form.Check
              className="my-2"
              type="radio"
              label="Credit/Debit Card"
              id="Card"
              name="paymentMethod"
              value="Card"
              checked={paymentMethod === "Card"}
              onChange={() => setPaymentMethod("Card")}
            ></Form.Check>
            <Form.Check
              className="my-2"
              type="radio"
              label="PayPal"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked={paymentMethod === "PayPal"}
              onChange={() => setPaymentMethod("PayPal")}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;
