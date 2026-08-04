import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Card, Button, Form, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductDetails } from "../store/slices/productSlice";
import { addToCart } from "../store/slices/cartSlice";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import API from "../api/axios";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewError, setReviewError] = useState(null);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const { product, loading, error } = useSelector((state) => state.products);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id, reviewSuccess]);

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty,
      })
    );
    navigate("/cart");
  };

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    setReviewError(null);
    try {
      await API.post(`/products/${id}/reviews`, { rating, comment });
      setRating(0);
      setComment("");
      setReviewSuccess((prev) => !prev); // triggers re-fetch
    } catch (err) {
      setReviewError(err.response?.data?.message || err.message);
    }
  };

  if (loading) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;
  if (!product) return null;

  return (
    <Container className="my-4">
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid rounded />
        </Col>
        <Col md={4}>
          <h3>{product.name}</h3>
          <Rating value={product.rating} numReviews={product.numReviews} />
          <h4 className="famms-price mt-3">₹{product.price}</h4>
          <p className="text-muted mt-3">{product.description}</p>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col className="fw-bold">₹{product.price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row className="align-items-center">
                    <Col>Qty:</Col>
                    <Col>
                      <Form.Select value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  className="btn-famms w-100"
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={6}>
          <h4>Reviews</h4>
          {product.reviews.length === 0 && <Message>No reviews yet.</Message>}
          <ListGroup variant="flush">
            {product.reviews.map((review) => (
              <ListGroup.Item key={review._id}>
                <strong>{review.name}</strong>
                <Rating value={review.rating} hideCount />
                <p className="text-muted mb-0" style={{ fontSize: "0.85rem" }}>
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col md={6}>
          <h4>Write a Review</h4>
          {reviewError && <Message variant="danger">{reviewError}</Message>}
          {userInfo ? (
            <Form onSubmit={submitReviewHandler}>
              <Form.Group className="mb-3">
                <Form.Label>Rating</Form.Label>
                <Form.Select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  required
                >
                  <option value="">Select...</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
              </Form.Group>
              <Button type="submit" className="btn-famms">
                Submit Review
              </Button>
            </Form>
          ) : (
            <Message>
              Please <a href="/login">sign in</a> to write a review.
            </Message>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;