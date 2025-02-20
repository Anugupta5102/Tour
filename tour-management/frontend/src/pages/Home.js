import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import SearchBar from '../components/common/SearchBar';
import TourCard from '../components/tours/TourCard';
import HotelCard from '../components/hotels/HotelCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { getAllTours, getAllHotels } from '../services/api';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [toursResponse, hotelsResponse] = await Promise.all([
          getAllTours({ featured: true }),
          getAllHotels({ featured: true })
        ]);
        setTours(toursResponse.data);
        setHotels(hotelsResponse.data);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (searchParams) => {
    // Implement search functionality
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-danger">{error}</div>;

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section bg-primary text-white py-5 mb-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h1 className="display-4 mb-4">Discover Your Next Adventure</h1>
              <p className="lead mb-4">
                Find and book the best tours and hotels around the world
              </p>
              <SearchBar onSearch={handleSearch} />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Featured Tours */}
      <Container>
        <h2 className="mb-4">Featured Tours</h2>
        <Row>
          {tours.map(tour => (
            <Col key={tour._id} md={4} className="mb-4">
              <TourCard tour={tour} />
            </Col>
          ))}
        </Row>
      </Container>

      {/* Featured Hotels */}
      <Container className="mt-5">
        <h2 className="mb-4">Featured Hotels</h2>
        <Row>
          {hotels.map(hotel => (
            <Col key={hotel._id} md={4} className="mb-4">
              <HotelCard hotel={hotel} />
            </Col>
          ))}
        </Row>
      </Container>

      {/* Why Choose Us Section */}
      <Container className="mt-5 mb-5">
        <Row className="justify-content-center text-center">
          <Col md={4} className="mb-4">
            <i className="ri-shield-check-line display-4 text-primary"></i>
            <h4>Safe Travel</h4>
            <p>Your safety is our top priority</p>
          </Col>
          <Col md={4} className="mb-4">
            <i className="ri-money-dollar-circle-line display-4 text-primary"></i>
            <h4>Best Prices</h4>
            <p>Guaranteed best rates and offers</p>
          </Col>
          <Col md={4} className="mb-4">
            <i className="ri-customer-service-2-line display-4 text-primary"></i>
            <h4>24/7 Support</h4>
            <p>We're here to help anytime</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
