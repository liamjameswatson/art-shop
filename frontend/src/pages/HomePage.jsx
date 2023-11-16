import Product from "../ui/Product";
import { Row, Col } from "react-bootstrap";

import Paginate from "../ui/Paginate";
import Spinner from "../ui/Spinner";
import Message from "../ui/Message";
import { useParams } from "react-router-dom";

import { useProducts } from "../productHooks/useProducts";

const HomePage = () => {
  const { data, isLoading, error } = useProducts();
  // console.log(data);

  const { pageNumber } = useParams();

  const { keyword } = useParams();

  if (isLoading) return <Spinner />;
  if (error)
    return <Message variant="danger">{error.message || error.error}</Message>;

  if (data)
    return (
      <>
        <h1>Products</h1>
        <Row>
          {data?.products.map((product, index) => (
            <Col key={index} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
        <Paginate pages={data.pages} page={data.page} />
      </>
    );
};

export default HomePage;
