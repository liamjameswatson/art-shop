import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
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

// import { useCreateOrderMutation } from "../slices/ordersApiSlice.js";
import { useCreateOrder } from "../orderhooks/useCreateOrder.js";
import { removeAllProducts } from "../redux/basketSlice.js";

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const basket = useSelector((state) => state.basket);

  console.log("cart =", basket);

  // const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const { createOrder, isCreating, error } = useCreateOrder();

  useEffect(() => {
    // if not addess or paymentMethod
    if (!basket.deliveryAddress.address) {
      navigate("/checkout");
    } else if (!basket.paymentMethod) {
      navigate("/payment");
    }
  }, [basket.paymentMethod, basket.deliveryAddress, navigate]);

  function handlePlaceOrder() {
    try {
      // create order
      createOrder(
        {
          orderItems: basket.products,
          deliveryAddress: basket.deliveryAddress,
          paymentMethod: basket.paymentMethod,
          itemsPrice: basket.productsPrice,
          deliveryPrice: basket.deliveryPrice,
          taxPrice: basket.taxPrice,
          totalPrice: basket.totalPrice,
        },
        {
          onSuccess: (data) => {
            navigate(`/order/${data.createdOrder._id}`); // success page
          },
        }
      );

      // clear cart
      // dispatch(removeAllProducts());
    } catch (error) {
      console.log({ error });
      toast.error(error.message);
    }
  }

  return (
    <>
      <Steps step1 step2 step3 step4 />
      <Row>
        <Col sm={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Delivery</h2>
              <p>
                <strong>Address:</strong> {basket.deliveryAddress.address},{" "}
                {basket.deliveryAddress.city}, {basket.deliveryAddress.postcode}
                , {basket.deliveryAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong> {basket.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {basket?.products.length === 0 ? (
                <Message>Your basket is empty</Message>
              ) : (
                // loop through each item in the basket
                <ListGroup variant="flush">
                  {basket?.products.map((item, index) => (
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
                  <Col>{basket.productsPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Delivery:</Col>
                  <Col>£{basket.deliveryPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Tax:</Col>
                  <Col>£{basket.taxPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total:</Col>
                  <Col>£{basket.totalPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                {error && (
                  <Message variant="danger">{error.message || error}</Message>
                )}
              </ListGroupItem>

              <ListGroupItem>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={basket.products.length === 0}
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </Button>
                {isCreating && <Spinner />}
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
