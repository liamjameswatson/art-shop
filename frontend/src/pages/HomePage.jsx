import Product from "../ui/Product";
import { Row, Col } from "react-bootstrap";
import { useGetProductsQuery } from "../slices/productsApiSlice";

import Spinner from "../ui/Spinner";
import Message from "../ui/Message";

const HomePage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>Products</h1>
          <Row>
            {products.map((product, index) => (
              <Col key={index} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
            
              </Col>
            ))}
          </Row>{" "}
        </>
      )}
    </>
  );
};

export default HomePage;
