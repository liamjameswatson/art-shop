import { useState } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditProductForm from "../ui/EditProductForm";

import { useDeleteProduct } from "../productHooks/useDeleteProduct";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:nth-child(even) {
    background-color: rgba(250, 0, 0, 0.064);
  }

  &:nth-child(odd) {
    background-color: #e9e9f3;
  }
`;

const Image = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Product = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  /* color: var(--color-grey-600); */
  font-family: "Sono";
`;

const Price = styled.div`
  /* font-family: "Sono"; */
  font-weight: 600;
`;

const Category = styled.div`
  /* font-family: "Sono"; */
  font-weight: 500;
  /* color: var(--color-green-700); */
`;

const Stock = styled.div`
  font-weight: 600;
`;

function ProductRow({ product }) {
  const [showEditForm, setShowEditForm] = useState(false);
  console.log("Product from product row", product);

  const { _id: productId, name, category, price, image, stockNumber } = product;

  const { isDeleting, deleteProduct } = useDeleteProduct();

  return (
    <>
      <TableRow>
        <Image src={image}></Image>
        <Product>{name}</Product>
        <Price>{price}</Price>
        <Category>{category}</Category>

        <Button
          variant="primary"
          className="btn-sm mx-2"
          onClick={() => {
            setShowEditForm((show) => !show);
          }}
        >
          <FaEdit />
          Edit
        </Button>
        <Button
          variant="danger"
          className="btn-sm"
          onClick={() => deleteProduct(productId)}
          disable={isDeleting}
        >
          <FaTrash />
          Delete
        </Button>
      </TableRow>
      {showEditForm && <EditProductForm product={product} />}
    </>
  );
}

export default ProductRow;
