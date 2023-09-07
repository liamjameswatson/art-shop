import { useParams } from "react-router-dom";
import { products } from "../../public/PlaeholderData";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from "react-bootstrap";

const ProductPage = () => {
  const { id: productId } = useParams();
  const product = products.find((p) => p._id === productId);
  console.log(product);
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Back
      </Link>
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
              <ListGroupItem>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>£{product.price}</strong>:
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>
                      {product.stockNumber > 0 ? "In Stock" : "Sold Out"}
                    </strong>
                    :
                  </Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Button
                  className="btn-primary"
                  type="button"
                  disabled={product.stockNumber === 0}
                >
                  Add to basket
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductPage;