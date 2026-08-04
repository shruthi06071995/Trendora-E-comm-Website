import React from "react";

const Rating = ({ value, numReviews, hideCount = false }) => {
  return (
    <div className="d-flex align-items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} style={{ color: "#f2994a" }}>
          {value >= star ? "★" : value >= star - 0.5 ? "★" : "☆"}
        </span>
      ))}
      {!hideCount && (
        <span className="text-muted ms-1" style={{ fontSize: "0.85rem" }}>
          {numReviews} reviews
        </span>
      )}
    </div>
  );
};

export default Rating;