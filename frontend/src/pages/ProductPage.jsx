import { useState } from "react";
import { useParams } from "react-router-dom";

import { useGetProductDetailsQuery } from "../slices/productsApiSlice";

import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import Spinner from "../ui/Spinner";
import Message from "../ui/Message";

const ProductPage = () => {
  // get id from params
  const { id: productId } = useParams();

  const [quantity, setQuantity] = useState(1);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Back
      </Link>

      {isLoading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Row>
            <Col md={5}>
              <Image src={product.image} alt={product.name} fluid></Image>
            </Col>
            <Col md={4}>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <p>{product.description}</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Price: £{product.price}</strong>
              </ListGroup.Item>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>£{product.price}</strong>:
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {product.stockNumber > 0 ? "In Stock" : "Sold Out"}
                        </strong>
                        :
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {/* show quantity if product is in stock */}
                  {product.stockNumber > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={quantity}
                            onChange={(e) =>
                              setQuantity(Number(e.target.value))
                            }
                          >
                            {/* Only allow stock number to be selected */}
                            {[...Array(product.stockNumber).keys()].map(
                              (stockCount) => (
                                <option
                                  key={stockCount + 1}
                                  value={stockCount + 1}
                                >
                                  {stockCount + 1}
                                </option>
                              )
                            )}
                            {/* {console.log([...Array(product.stockNumber).keys()])} */}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      className="btn-primary"
                      type="button"
                      disabled={product.stockNumber === 0}
                    >
                      Add to basket
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductPage;
