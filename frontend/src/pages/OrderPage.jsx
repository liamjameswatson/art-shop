import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";
import Message from "../ui/Message";
import Spinner from "../ui/Spinner";
import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice";

const OrderPage = () => {
  const { id: orderId } = useParams();

  // refetch will prevent stale data
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  console.log(order);

  return isLoading ? (
    <Spinner />
  ) : error ? (
    <Message variant="danger">{error.error || "Order not found"}</Message>
  ) : (
    <>
      <h1>Order</h1>
      <Row>
        <Col sm={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Delivery</h2>
              <p>
                <strong>Name:</strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong> {order.user.email}
              </p>
              <p>
                <strong>Address: </strong> {order.deliveryAddress.address},{" "}
                {order.deliveryAddress.city}, {order.deliveryAddress.postcode},{" "}
                {order.deliveryAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered yet</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paiddAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={3} sm={3} xs={2}>
                      <Image src={item.image} alt={item.name} fluid rounded/>
                    </Col>
                    <Col>
                      {" "}
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={4} sm={4} xs={4}>
                      {" "}
                      {item.quantity} x £{item.price} = £{ item.quantity * item.price}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col sm={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>£{order.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Delivery</Col>
                  <Col>£{order.deliveryPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>£{order.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>£{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            {/* PAY ORDER PLACEHOLDER */}
            {/* MARK AS DELIVERED*/}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderPage;
