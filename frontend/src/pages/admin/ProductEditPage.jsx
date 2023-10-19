import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, FormGroup } from "react-bootstrap";
import Spinner from "../../ui/Spinner";
import FormContainer from "../../ui/FormContainer";
import Message from "../../ui/Message";

import { toast } from "react-toastify";

import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useUploadProductImageMutation,
  useUploadMultipleProductImagesMutation,
} from "../../slices/productsApiSlice";

const ProductEditPage = () => {
  const navigate = useNavigate();

  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [otherImages, setOtherImages] = useState([]);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [stockNumber, setStockNumber] = useState(0);

  const {
    data: product,
    isLoading,
    // refetch,
    error,
  } = useGetProductDetailsQuery(productId); //productId from url
  // console.log(product);

  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const [uploadProductImage, { isLoading: isUploading }] =
    useUploadProductImageMutation();

  const [uploadOtherProductImages, { isLoading: isUploadingMulti }] =
    useUploadMultipleProductImagesMutation();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setImage(product.image);
      setOtherImages(product.otherImages);
      setCategory(product.category);
      setPrice(product.price);
      setStockNumber(product.stockNumber);
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      productId,
      name,
      description,
      image,
      otherImages,
      category,
      stockNumber,
      price,
    };

    const result = await updateProduct(updatedProduct);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Product updated");
      navigate("/admin/productlist");
    }
  };

  const handleUploadFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
      console.log(error);
    }
  };

  // Assuming you want to store the file names in an array
  const handleUploadFiles = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const newOtherImages = []; // Create an array to store file names
    // console.log("newOtherImages ", newOtherImages);

    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("otherImages", e.target.files[i]);
      newOtherImages.push(e.target.files[i].name); // Store file names
    }

    console.log("formData ", formData);
    console.log("newOtherImages", newOtherImages);
    try {
      const res = await uploadOtherProductImages(formData).unwrap();
      toast.success(res.message);
      setOtherImages(res.images); // Update the state with file names
    } catch (error) {
      toast.error(error?.data?.message || error.error);
      console.log(error);
    }
  };

  return (
    <>
      <Link className="btn btn-primary my-3" to="/admin/productlist">
        {" "}
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {isUpdating && <Spinner />}

        {isLoading ? (
          <Spinner />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="my-2" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <FormGroup className="my-2" controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>

              <Form.Control
                type="file"
                label="Choose file"
                onChange={handleUploadFile}
              ></Form.Control>
              {isUploading && <Spinner />}
            </FormGroup>

            {/* ////////////////////////////////////////////////////// */}
            <FormGroup className="my-2" controlId="otherImages">
              <Form.Label>otherImages</Form.Label>
              <Form.Control
                type="text"
                placeholder="Other Images"
                value={otherImages}
                onChange={(e) => setOtherImages(e.target.value)}
              ></Form.Control>

              <Form.Control
                type="file"
                label="Choose file"
                onChange={handleUploadFiles}
                multiple
              ></Form.Control>
              {isUploadingMulti && <Spinner />}
            </FormGroup>
            {/* ////////////////////////////////////////// */}
            <Form.Group className="my-2" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="stockNumber">
              <Form.Label>StockNumber</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter stockNumber"
                value={stockNumber}
                onChange={(e) => setStockNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="my-2">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditPage;
