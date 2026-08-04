import React, { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import API from "../api/axios";
import Loader from "../components/Loader";
import Message from "../components/Message";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await API.get(`/orders/${id}`);
        setOrder(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;
  if (!order) return null;

  return (
    <Container className="my-4">
      <h4 className="mb-3">Order {order._id}</h4>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h5>Shipping</h5>
              <p>
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              <Message variant={order.isDelivered ? "success" : "warning"}>
                {order.isDelivered ? "Delivered" : "Not Delivered"}
              </Message>
            </ListGroup.Item>
            <ListGroup.Item>
              <h5>Payment Method</h5>
              <p>{order.paymentMethod}</p>
              <Message variant={order.isPaid ? "success" : "warning"}>
                {order.isPaid ? "Paid" : "Not Paid"}
              </Message>
            </ListGroup.Item>
            <ListGroup.Item>
              <h5>Order Items</h5>
              {order.orderItems.map((item) => (
                <Row key={item.product} className="align-items-center mb-2">
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
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item><h5>Order Summary</h5></ListGroup.Item>
              <ListGroup.Item><Row><Col>Items</Col><Col>₹{order.itemsPrice}</Col></Row></ListGroup.Item>
              <ListGroup.Item><Row><Col>Shipping</Col><Col>₹{order.shippingPrice}</Col></Row></ListGroup.Item>
              <ListGroup.Item><Row><Col>Tax</Col><Col>₹{order.taxPrice}</Col></Row></ListGroup.Item>
              <ListGroup.Item><Row><Col className="fw-bold">Total</Col><Col className="fw-bold">₹{order.totalPrice}</Col></Row></ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderDetails;
