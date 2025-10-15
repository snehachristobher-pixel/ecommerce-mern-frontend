import React, { useState } from "react";
import NavigationButtons from "../components/NavigationButtons";
import "./Review.css";

const StarRating = ({ rating, setRating }) => (
  <div
    style={{
      display: "flex",
      gap: 5,
      fontSize: 26,
      cursor: "pointer",
      marginBottom: 12,
    }}
  >
    {[1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        onClick={() => setRating(star)}
        style={{ color: star <= rating ? "#FFD700" : "#ccc" }}
        aria-label={`${star} star`}
        role="radio"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setRating(star);
        }}
      >
        ★
      </span>
    ))}
  </div>
);

const Review = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a rating.");
      return;
    }
    if (comment.trim() === "") {
      alert("Please write a review comment.");
      return;
    }
    // Submit review to backend or store in global state here
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="review-bg">
        <div className="review-card" style={{ textAlign: "center" }}>
          <h2>Thank you for your review!</h2>
          <NavigationButtons prevPath="/" nextPath={null} />
        </div>
      </div>
    );
  }

  return (
    <div className="review-bg">
      <div className="review-card">
        <h2>Submit a Review</h2>
        <form onSubmit={handleSubmit}>
          <label className="review-label">
            Rating:
            <StarRating rating={rating} setRating={setRating} />
          </label>
          <label className="review-label" htmlFor="review-comment">
            Comment:
            <textarea
              id="review-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="review-textarea"
              placeholder="Write your comments..."
              required
            />
          </label>
          <button
            type="submit"
            className="review-btn"
            style={{ marginTop: 12 }}
          >
            Submit Review
          </button>
        </form>
        <div style={{ marginTop: 20 }}>
          <NavigationButtons prevPath="/" nextPath={null} />
        </div>
      </div>
    </div>
  );
};

export default Review;
