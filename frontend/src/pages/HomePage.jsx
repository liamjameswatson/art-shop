import { Row, Col } from "react-bootstrap";
import { products } from "../../public/placeholderData";
import Product from "../ui/Product";

const HomePage = () => {
  return (
    <>
      <h1>Products</h1>
      <Row>
        {products.map((product, index) => (
          <Col key={index} sm={12} md={6} lg={4} xl={3}>
            <Product product={product}/>
            {console.log(product.name)}
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomePage;
