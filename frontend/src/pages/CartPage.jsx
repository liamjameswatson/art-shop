import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../ui/Message";
import { useState } from "react";

import {
  addProductToBasket,
  deleteProductFromBasket,
} from "../redux/basketSlice";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState("");

  const { products: productsInBasket } = useSelector((state) => state.basket);
  console.log({ productsInBasket });

  const handleAddToBasket = async (product, quantity) => {
    console.log(product, quantity);
    dispatch(addProductToBasket({ ...product, quantity }));
  };

  const handleDeleteFromBasket = (id) => {
    dispatch(deleteProductFromBasket(id));
  };

  const handleCheckout = () => {
    navigate("/login?redirect=/checkout"); // check if logged in
  };

  return (
    <>
      <h1>Your Basket</h1>
      <Row>
        <Col md={8}>
          <h1 style={{ marginBottom: "20px" }}>Shopping Cart</h1>
          <Link className="btn btn-light my-3" to="/">
            Back
          </Link>
          {productsInBasket.length === 0 ? (
            <Message>
              Your basket is empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {productsInBasket.map((product) => (
                <ListGroup.Item key={product._id}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </Col>
                    <Col md={2}>£{product.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={product.quantity}
                        onChange={(e) => {
                          setQuantity(Number(e.target.value)),
                            handleAddToBasket(product, Number(e.target.value));
                        }}
                      >
                        {/* Only allow stock number to be selected */}
                        {[...Array(product.stockNumber).keys()].map(
                          (stockCount) => (
                            <option key={stockCount + 1} value={stockCount + 1}>
                              {stockCount + 1}
                            </option>
                          )
                        )}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => handleDeleteFromBasket(product._id)}
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  SubTotal (
                  {productsInBasket.reduce(
                    (acc, product) => acc + product.quantity,
                    0
                  )}
                  ) products
                </h2>
                £
                {productsInBasket
                  .reduce(
                    (acc, product) => acc + product.quantity * product.price,
                    0
                  )
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={productsInBasket.length === 0}
                  onClick={handleCheckout}
                >
                  {" "}
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartPage;
