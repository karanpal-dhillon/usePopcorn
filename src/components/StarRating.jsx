import { useState } from "react";
import PropTypes from "prop-types";
import Star from "./Star";

const containerStyle = {
  display: "flex",
  gap: "16px",
  justifyContent: "center",
};
const starContainerStyle = {
  display: "flex",
  gap: "4px",
};

const StarRating = ({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  messages = [],
  defaultRating = 0,
}) => {
  const textStyle = {
    lineHeight: "1",
    margin: 0,
    fontSize: `{size / 1.5}px`,
  };
  const [rating, setRating] = useState(defaultRating);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            color={color}
            size={size}
            fill={hoverRating ? i < hoverRating : i < rating}
            onRate={() => setRating(i + 1)}
            onHoverIn={() => setHoverRating(i + 1)}
            onHoverOut={() => setHoverRating(0)}
          />
        ))}
      </div>
      {messages.length === maxRating ? (
        messages[hoverRating ? hoverRating - 1 : rating - 1]
      ) : (
        <p style={textStyle}>{hoverRating || rating || ""}</p>
      )}
    </div>
  );
};

StarRating.propTypes = {
  maxRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  messages: PropTypes.array,
  defaultRating: PropTypes.number,
};
export default StarRating;
