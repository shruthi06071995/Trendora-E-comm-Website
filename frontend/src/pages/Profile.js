import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Card, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import API from "../api/axios";
import Loader from "../components/Loader";
import Message from "../components/Message";

const Profile = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await API.get("/orders/myorders");
                setOrders(data);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    return (
        <Container className="my-4">
            <Row>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h5>My Profile</h5>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Name:</strong> {userInfo?.name}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Email:</strong> {userInfo?.email}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Account Type:</strong> {userInfo?.isAdmin ? "Admin" : "Customer"}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>

                <Col md={8}>
                    <h4 className="mb-3">My Orders</h4>
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <Message variant="danger">{error}</Message>
                    ) : orders.length === 0 ? (
                        <Message>
                            You have no orders yet. <Link to="/">Start shopping</Link>
                        </Message>
                    ) : (
                        <Table striped bordered hover responsive size="sm">
                            <thead>
                                <tr>
                                    <th>ORDER ID</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id.slice(-8)}</td>
                                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td>₹{order.totalPrice}</td>
                                        <td>{order.isPaid ? "Yes" : "No"}</td>
                                        <td>{order.isDelivered ? "Yes" : "No"}</td>
                                        <td>
                                            <Link to={`/order/${order._id}`} className="btn btn-sm btn-famms">
                                                Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;