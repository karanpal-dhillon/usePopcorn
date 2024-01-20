import PropTypes from "prop-types";

const Err = ({ message }) => {
  return <div className="error">{message}</div>;
};

Err.propTypes = {
  message: PropTypes.string.isRequired,
};
export default Err;
