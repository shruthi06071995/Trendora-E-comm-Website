import React, { useState } from "react";
import { Container, Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { clearCart } from "../store/slices/cartSlice";
import API from "../api/axios";
import Message from "../components/Message";

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { cartItems, shippingAddress } = useSelector((state) => state.cart);

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 1000 ? 0 : 50;
  const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await API.post("/orders", {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod: "Cash on Delivery",
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      dispatch(clearCart());
      navigate(`/order/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-4">
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h5>Shipping</h5>
              <p>
                {shippingAddress.address}, {shippingAddress.city} {shippingAddress.postalCode},{" "}
                {shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h5>Order Items</h5>
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.product}>
                    <Row className="align-items-center">
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={6}>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} x ₹{item.price} = ₹{(item.qty * item.price).toFixed(2)}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h5>Order Summary</h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row><Col>Items</Col><Col>₹{itemsPrice.toFixed(2)}</Col></Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row><Col>Shipping</Col><Col>₹{shippingPrice.toFixed(2)}</Col></Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row><Col>Tax</Col><Col>₹{taxPrice.toFixed(2)}</Col></Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row><Col className="fw-bold">Total</Col><Col className="fw-bold">₹{totalPrice.toFixed(2)}</Col></Row>
              </ListGroup.Item>
              {error && (
                <ListGroup.Item>
                  <Message variant="danger">{error}</Message>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  className="btn-famms w-100"
                  disabled={cartItems.length === 0 || loading}
                  onClick={placeOrderHandler}
                >
                  {loading ? "Placing Order..." : "Place Order"}
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaceOrder;
