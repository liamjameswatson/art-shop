import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Message from "../../ui/Message";
import Spinner from "../../ui/Spinner";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice";

import { toast } from "react-toastify";
import Paginate from "../../ui/Paginate";

const ProductListPage = () => {
  const pageNumber = useParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });
  const [
    createProduct,
    { isLoading: loadingCreateProduct, error: createProductError },
  ] = useCreateProductMutation();

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation(
    {}
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await deleteProduct(id);
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };

  const handleCreateProduct = async () => {
    if (
      window.confirm("Are you sure you sure you want to create a new product?")
    ) {
      try {
        await createProduct();
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={handleCreateProduct}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>

      {loadingCreateProduct && <Spinner />}
      {isDeleting && <Spinner />}

      {isLoading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="primary" className="btn-sm mx-2">
                        <FaEdit />
                        Edit
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => handleDelete(product._id)}
                    >
                      <FaTrash />
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={data.pages} page={data.page} isAdmin />
        </>
      )}
    </>
  );
};

export default ProductListPage;
