import { useState } from "react";
import PropTypes from "prop-types";

const Box = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "-" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
};

Box.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Box;
