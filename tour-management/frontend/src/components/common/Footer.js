import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Travel Explorer</h5>
            <p>Your trusted partner for amazing travel experiences.</p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/tours" className="text-light">Tours</a></li>
              <li><a href="/hotels" className="text-light">Hotels</a></li>
              <li><a href="/about" className="text-light">About Us</a></li>
              <li><a href="/contact" className="text-light">Contact</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li><i className="ri-map-pin-line me-2"></i>123 Travel Street, City</li>
              <li><i className="ri-phone-line me-2"></i>+1 234 567 890</li>
              <li><i className="ri-mail-line me-2"></i>info@travelexplorer.com</li>
            </ul>
          </Col>
        </Row>
        <hr className="bg-light" />
        <div className="text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} Travel Explorer. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
