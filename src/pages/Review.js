import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Review.css";

const StarRating = ({ rating, setRating }) => {
  const handleKeyDown = (e, star) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setRating(star);
    }
    if (e.key === "ArrowRight" && rating < 5) {
      e.preventDefault();
      setRating(rating + 1);
    }
    if (e.key === "ArrowLeft" && rating > 1) {
      e.preventDefault();
      setRating(rating - 1);
    }
  };

  return (
    <div
      className="star-rating"
      role="radiogroup"
      aria-label="Rating from 1 to 5 stars"
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const isSelected = star === rating;
        return (
          <span
            key={star}
            className={`star ${star <= rating ? "star--active" : ""}`}
            role="radio"
            aria-checked={isSelected}
            tabIndex={
              rating === 0 ? (star === 1 ? 0 : -1) : isSelected ? 0 : -1
            }
            onClick={() => setRating(star)}
            onKeyDown={(e) => handleKeyDown(e, star)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

const Review = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({ rating: "", comment: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      rating: rating === 0 ? "Please select a rating." : "",
      comment: comment.trim() === "" ? "Please write a review comment." : "",
    };

    setErrors(newErrors);

    if (newErrors.rating || newErrors.comment) return;

    // Submit review (API call can go here)
    setSubmitted(true);
  };

  const handleBack = () => navigate("/cart");
  const handleNext = () => navigate("/");

  if (submitted) {
    return (
      <div className="review-bg">
        <div className="review-card review-card--center">
          <h2>Thank you for your review!</h2>
          <div className="card-nav-buttons">
            <button
              type="button"
              className="nav-btn back-btn"
              onClick={handleBack}
            >
              ← Back
            </button>
            <button
              type="button"
              className="nav-btn next-btn"
              onClick={handleNext}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="review-bg">
      <div className="review-card">
        <h2>Submit a Review</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="review-field">
            <label className="review-label" id="rating-label">
              Rating:
            </label>
            <StarRating rating={rating} setRating={setRating} />
            {errors.rating && (
              <p className="review-error" role="alert">
                {errors.rating}
              </p>
            )}
          </div>

          <div className="review-field">
            <label className="review-label" htmlFor="review-comment">
              Comment:
            </label>
            <textarea
              id="review-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className={`review-textarea ${
                errors.comment ? "review-textarea--invalid" : ""
              }`}
              placeholder="Write your comments..."
              aria-describedby={
                errors.comment ? "review-comment-error" : undefined
              }
            />
            {errors.comment && (
              <p
                id="review-comment-error"
                className="review-error"
                role="alert"
              >
                {errors.comment}
              </p>
            )}
          </div>

          <button type="submit" className="review-btn">
            Submit Review
          </button>
        </form>

        {/* Back / Next buttons under form */}
        <div className="card-nav-buttons">
          <button
            type="button"
            className="nav-btn back-btn"
            onClick={handleBack}
          >
            ← Back
          </button>
          <button
            type="button"
            className="nav-btn next-btn"
            onClick={handleNext}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;
