import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../store/slices/cartSlice";

const Shipping = () => {
  const { shippingAddress } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "");
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/placeorder");
  };

  return (
    <Container className="my-5" style={{ maxWidth: "480px" }}>
      <h3 className="mb-4 text-center">Shipping Address</h3>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control required value={address} onChange={(e) => setAddress(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control required value={city} onChange={(e) => setCity(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            required
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Country</Form.Label>
          <Form.Control required value={country} onChange={(e) => setCountry(e.target.value)} />
        </Form.Group>
        <Button type="submit" className="btn-famms w-100">
          Continue
        </Button>
      </Form>
    </Container>
  );
};

export default Shipping;
