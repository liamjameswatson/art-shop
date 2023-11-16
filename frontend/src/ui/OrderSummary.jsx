import { Card, ListGroup, Col, Row } from "react-bootstrap";
function OrderSummary({
  order: { itemsPrice, deliveryPrice, taxPrice, totalPrice },
}) {
  console.log("data from summary=", itemsPrice);
  return (
    <Card>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <h2>Order Summary</h2>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>Items</Col>
            <Col>£{itemsPrice}</Col>
          </Row>
          <Row>
            <Col>Delivery</Col>
            <Col>£{deliveryPrice}</Col>
          </Row>
          <Row>
            <Col>Tax</Col>
            <Col>£{taxPrice}</Col>
          </Row>
          <Row>
            <Col>Total</Col>
            <Col>£{totalPrice}</Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

export default OrderSummary;
