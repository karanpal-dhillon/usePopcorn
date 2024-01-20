import PropTypes from "prop-types";
const Nav = ({ children }) => {
  return <nav className="nav-bar">{children}</nav>;
};

Nav.propTypes = {
  children: PropTypes.node,
};
export default Nav;
