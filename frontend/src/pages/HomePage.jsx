import { useEffect, useState } from "react";
import axios from "axios";

import Product from "../ui/Product";
import { Row, Col } from "react-bootstrap";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("http://localhost:8000/api/products");
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1>Products</h1>
      <Row>
        {products.map((product, index) => (
          <Col key={index} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
            {console.log(product.name)}
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomePage;
