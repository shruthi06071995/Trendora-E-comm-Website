import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const ProductCard = ({ product }) => {
  return (
    <Card className="famms-card mb-4">
      <Link to={`/product/${product._id}`}>
        <Card.Img variant="top" src={product.image} alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`} className="text-decoration-none text-dark">
          <Card.Title as="div" className="fw-semibold" style={{ fontSize: "1rem" }}>
            {product.name}
          </Card.Title>
        </Link>
        <Rating value={product.rating} numReviews={product.numReviews} />
        <Card.Text as="h5" className="famms-price mt-2">
          ₹{product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
