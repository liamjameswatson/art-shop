import { useState } from "react";
import CreateProductForm from "../../ui/CreateProductForm";
import Row from "../../ui/Row";
import ProductTable from "../../ui/ProductTable";
import { Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";

const ProductListPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  return (
    <>
      <h1>All Products</h1>
      <Row type="horizontal">
        <ProductTable />
      </Row>

      <Button
        className="btn-sm m-3"
        onClick={() => setShowCreateForm((show) => !show)}
      >
        <FaEdit /> Create Product
      </Button>
      {showCreateForm && <CreateProductForm />}
    </>
  );
};

export default ProductListPage;
