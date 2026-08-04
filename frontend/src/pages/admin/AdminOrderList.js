import React, { useEffect, useState, useCallback } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import API from "../../api/axios";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOrders = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/orders");
      setOrders(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const markDeliveredHandler = async (id) => {
    if (window.confirm("Mark this order as delivered?")) {
      await API.put(`/orders/${id}/deliver`);
      loadOrders();
    }
  };

  return (
    <Container className="my-4">
      <h4 className="mb-3">All Orders</h4>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : orders.length === 0 ? (
        <Message>No orders placed yet.</Message>
      ) : (
        <Table striped bordered hover responsive size="sm">
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>USER</th>
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
                <td>{order.user ? order.user.name : "Deleted User"}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>₹{order.totalPrice}</td>
                <td>{order.isPaid ? "Yes" : "No"}</td>
                <td>{order.isDelivered ? "Yes" : "No"}</td>
                <td className="d-flex gap-2">
                  <Link to={`/order/${order._id}`} className="btn btn-sm btn-famms">
                    View
                  </Link>
                  {!order.isDelivered && (
                    <Button
                      size="sm"
                      variant="outline-success"
                      onClick={() => markDeliveredHandler(order._id)}
                    >
                      Mark Delivered
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AdminOrderList;