import Product from "../ui/Product";
import { Row, Col } from "react-bootstrap";
import { useGetProductsQuery } from "../slices/productsApiSlice";

import Paginate from "../ui/Paginate";
import Spinner from "../ui/Spinner";
import Message from "../ui/Message";
import { useParams } from "react-router-dom";

const HomePage = () => {
  const { pageNumber } = useParams();

  const { keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

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
            {data.products.map((product, index) => (
              <Col key={index} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={data.pages} page={data.page} />
        </>
      )}
    </>
  );
};

export default HomePage;
