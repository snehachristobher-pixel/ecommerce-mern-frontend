import React, { useState } from "react";
import NavigationButtons from "../components/NavigationButtons";

const StarRating = ({ rating, setRating }) => {
  return (
    <div style={{ display: "flex", gap: 5, fontSize: 24, cursor: "pointer" }}>
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
};

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
      <div style={{ maxWidth: 400, margin: "40px auto", textAlign: "center" }}>
        <h2>Thank you for your review!</h2>
        <NavigationButtons prevPath="/" nextPath={null} />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>Submit a Review</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Rating:
          <StarRating rating={rating} setRating={setRating} />
        </label>
        <br />
        <br />
        <label>
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            style={{ width: "100%" }}
          />
        </label>
        <br />
        <button type="submit" style={{ marginTop: 10 }}>
          Submit Review
        </button>
      </form>
      <NavigationButtons prevPath="/" nextPath={null} />
    </div>
  );
};

export default Review;
