import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../store/slices/productSlice";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";

const Home = () => {
  const dispatch = useDispatch();
  const { keyword, pageNumber } = useParams();
  const { products, page, pages, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ keyword, pageNumber }));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <div className="famms-hero text-center">
        <Container>
          <h1>
            Shop Smart with <span>Trendora</span>
          </h1>
          <p className="mb-0" style={{ opacity: 0.85 }}>
            Quality products, honest prices, fast delivery.
          </p>
        </Container>
      </div>

      <Container>
        <h4 className="mb-4 fw-semibold">Latest Products</h4>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
          </>
        )}
      </Container>
    </>
  );
};

export default Home;