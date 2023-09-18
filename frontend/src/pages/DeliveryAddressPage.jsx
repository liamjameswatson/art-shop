import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../ui/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveDeliveryAddress } from "../slices/cartSlice";

const DeliveryAddressPage = () => {
  const cart = useSelector((state) => state.cart);
  const { deliveryAddress } = cart;
  console.log(deliveryAddress);

  const [address, setAddress] = useState(deliveryAddress?.address || "");
  const [city, setCity] = useState(deliveryAddress?.city || "");
  const [postcode, setPostcode] = useState(deliveryAddress?.postcode || "");
  const [country, setCountry] = useState(deliveryAddress?.country || "");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveDeliveryAddress({ address, city, postcode, country }));
    navigate("/payment");
  };
  return (
    <FormContainer>
      <h1>Delivery Address</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-2" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="address">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="address">
          <Form.Label>Postcode</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Postcode"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="address">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>

        <Button className="my-2" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default DeliveryAddressPage;
