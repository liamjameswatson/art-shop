import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
} from "react-bootstrap";

import Steps from "../ui/Steps";
import Message from "../ui/Message";
import Spinner from "../ui/Spinner";

import { useCreateOrderMutation } from "../slices/ordersApiSlice.js";
import { clearCartItems } from "../slices/cartSlice.js";

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    // if not addess or paymentMethod
    if (!cart.deliveryAddress.address) {
      navigate("/checkout");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.deliveryAddress, navigate]);

  const handlePlaceOrder = async () => {
    try {
      // create order
      const res = await createOrder({
        orderItems: cart.cartItems,
        deliveryAddress: cart.deliveryAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        deliveryPrice: cart.deliveryPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      // clear cart
      dispatch(clearCartItems());

      navigate(`/order/${res._id}`); //success page
    } catch (error) {
      toast.error(error.data.message);
      console.log(error);
    }
  };

  return (
    <>
      <Steps step1 step2 step3 step4 />
      <Row>
        <Col sm={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Delivery</h2>
              <p>
                <strong>Address:</strong> {cart.deliveryAddress.address},{" "}
                {cart.deliveryAddress.city}, {cart.deliveryAddress.postcode},{" "}
                {cart.deliveryAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong> {cart.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your basket is empty</Message>
              ) : (
                // loop through each item in the basket
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col sm={3}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x £{item.price} = £
                          {item.quantity * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col sm={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>Order Summary</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Items:</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Delivery:</Col>
                  <Col>${cart.deliveryPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total:</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                {error && <Message variant="danger">{error.message}</Message>}
              </ListGroupItem>

              <ListGroupItem>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={cart.cartItems.length === 0}
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </Button>
                {isLoading && <Spinner />}
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};
//
export default PlaceOrderPage;
