import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar as RNavbar, Nav, NavItem, NavLink, Button } from 'reactstrap';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <RNavbar color="light" light expand="md" className="px-4 py-3">
      <Link to="/" className="navbar-brand">Travel Explorer</Link>
      <Nav className="ms-auto" navbar>
        <NavItem>
          <Link to="/" className="nav-link">Home</Link>
        </NavItem>
        <NavItem>
          <Link to="/tours" className="nav-link">Tours</Link>
        </NavItem>
        <NavItem>
          <Link to="/hotels" className="nav-link">Hotels</Link>
        </NavItem>
        {isAuthenticated ? (
          <>
            <NavItem>
              <Link to="/bookings" className="nav-link">My Bookings</Link>
            </NavItem>
            <NavItem>
              <Button color="link" onClick={logout}>Logout</Button>
            </NavItem>
          </>
        ) : (
          <NavItem>
            <Link to="/login" className="btn btn-primary">Login</Link>
          </NavItem>
        )}
      </Nav>
    </RNavbar>
  );
};

export default Navbar;
