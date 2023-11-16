import styled from "styled-components";
import Spinner from "../ui/Spinner";
import ProductRow from "../ui/ProductRow";

import { useProducts } from "../productHooks/useProducts";
import Message from "./Message";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grtabey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

const ProductTable = () => {
  const { data, isLoading, error } = useProducts();

  if (isLoading) return <Spinner />;
  if (error)
    return <Message variant="danger">{error.message || error.error}</Message>;

  return (
    <Table role="table">
      <TableHeader role="row">
        <div>ID</div>
        <div>Name</div>
        <div>Price</div>
        <div>Stock number</div>
      </TableHeader>
      {data.products.map((product) => (
        <ProductRow product={product} key={product._id} />
      ))}
    </Table>
  );
};

export default ProductTable;
