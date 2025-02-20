import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, Nav, NavItem, NavLink } from 'reactstrap';
import { getHotelById } from '../services/api';
import BookingForm from '../components/bookings/BookingForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { formatPrice } from '../utils/formatters';

const HotelDetail = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await getHotelById(id);
        setHotel(response.data);
      } catch (err) {
        setError('Failed to load hotel details');
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-danger">{error}</div>;
  if (!hotel) return <div className="text-center">Hotel not found</div>;

  return (
    <Container className="py-5">
      <Row>
        <Col md={8}>
          {/* Hotel Images */}
          <div className="hotel-images mb-4">
            <img
              src={hotel.images[0]}
              alt={hotel.name}
              className="img-fluid rounded"
            />
            <Row className="mt-2">
              {hotel.images.slice(1).map((image, index) => (
                <Col key={index} md={4}>
                  <img
                    src={image}
                    alt={`${hotel.name} ${index + 2}`}
                    className="img-fluid rounded"
                  />
                </Col>
              ))}
            </Row>
          </div>

          {/* Hotel Details */}
          <Card className="mb-4">
            <CardBody>
              <h2>{hotel.name}</h2>
              <div className="d-flex align-items-center mb-3">
                <div className="me-4">
                  <i className="ri-map-pin-line me-1"></i>
                  {hotel.location}
                </div>
                <div className="rating">
                  <i className="ri-star-fill text-warning me-1"></i>
                  <span>{hotel.rating.toFixed(1)}</span>
                </div>
              </div>

              {/* Navigation Tabs */}
              <Nav tabs className="mb-4">
                <NavItem>
                  <NavLink
                    className={activeTab === 'overview' ? 'active' : ''}
                    onClick={() => setActiveTab('overview')}
                  >
                    Overview
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTab === 'rooms' ? 'active' : ''}
                    onClick={() => setActiveTab('rooms')}
                  >
                    Rooms
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTab === 'amenities' ? 'active' : ''}
                    onClick={() => setActiveTab('amenities')}
                  >
                    Amenities
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTab === 'reviews' ? 'active' : ''}
                    onClick={() => setActiveTab('reviews')}
                  >
                    Reviews
                  </NavLink>
                </NavItem>
              </Nav>

              {/* Tab Content */}
              <div className="tab-content">
                {activeTab === 'overview' && (
                  <div>
                    <h5>About</h5>
                    <p>{hotel.description}</p>
                    <h5>Location</h5>
                    <p>{hotel.address}</p>
                  </div>
                )}

                {activeTab === 'rooms' && (
                  <div>
                    <h5>Available Room Types</h5>
                    <Row>
                      {hotel.roomTypes.map((room, index) => (
                        <Col key={index} md={6} className="mb-4">
                          <Card>
                            <CardBody>
                              <h6>{room.type}</h6>
                              <div className="text-primary mb-2">
                                {formatPrice(room.price)}/night
                              </div>
                              <div className="small text-muted">
                                <i className="ri-user-line me-1"></i>
                                Capacity: {room.capacity} persons
                              </div>
                            </CardBody>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </div>
                )}

                {activeTab === 'amenities' && (
                  <div>
                    <h5>Hotel Amenities</h5>
                    <Row>
                      {hotel.amenities.map((amenity, index) => (
                        <Col key={index} md={4} className="mb-3">
                          <div className="d-flex align-items-center">
                            <i className="ri-checkbox-circle-line text-primary me-2"></i>
                            {amenity}
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <h5>Guest Reviews</h5>
                    {hotel.reviews?.map((review) => (
                      <div key={review._id} className="review-item border-bottom py-3">
                        <div className="d-flex justify-content-between">
                          <div>
                            <h6>{review.user.username}</h6>
                            <div className="text-muted small">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="rating">
                            {[...Array(5)].map((_, i) => (
                              <i
                                key={i}
                                className={`ri-star-${
                                  i < review.rating ? 'fill' : 'line'
                                } text-warning`}
                              ></i>
                            ))}
                          </div>
                        </div>
                        <p className="mt-2 mb-0">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md={4}>
          {/* Booking Form */}
          <div className="sticky-top" style={{ top: '2rem' }}>
            <Card className="price-card mb-4">
              <CardBody>
                <h3 className="text-primary mb-3">
                  From {formatPrice(Math.min(...hotel.roomTypes.map(r => r.price)))}
                  <small className="text-muted">/night</small>
                </h3>
                <hr />
                <BookingForm hotel={hotel} />
              </CardBody>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HotelDetail;
