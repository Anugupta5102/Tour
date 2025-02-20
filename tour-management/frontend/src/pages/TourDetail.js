import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import { getTourById } from '../services/api';
import BookingForm from '../components/bookings/BookingForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { formatPrice, formatDuration } from '../utils/formatters';

const TourDetail = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await getTourById(id);
        setTour(response.data);
      } catch (err) {
        setError('Failed to load tour details');
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-danger">{error}</div>;
  if (!tour) return <div className="text-center">Tour not found</div>;

  return (
    <Container className="py-5">
      <Row>
        <Col md={8}>
          {/* Tour Images */}
          <div className="tour-images mb-4">
            <img
              src={tour.images[0]}
              alt={tour.title}
              className="img-fluid rounded"
            />
            <Row className="mt-2">
              {tour.images.slice(1).map((image, index) => (
                <Col key={index} md={4}>
                  <img
                    src={image}
                    alt={`${tour.title} ${index + 2}`}
                    className="img-fluid rounded"
                  />
                </Col>
              ))}
            </Row>
          </div>

          {/* Tour Details */}
          <Card className="mb-4">
            <CardBody>
              <h2>{tour.title}</h2>
              <div className="d-flex mb-3">
                <div className="me-4">
                  <i className="ri-map-pin-line me-1"></i>
                  {tour.location}
                </div>
                <div className="me-4">
                  <i className="ri-time-line me-1"></i>
                  {formatDuration(tour.duration)}
                </div>
                <div>
                  <i className="ri-group-line me-1"></i>
                  Max {tour.maxGroupSize} people
                </div>
              </div>
              <h5>Description</h5>
              <p>{tour.description}</p>
              
              {/* Highlights */}
              <h5>Highlights</h5>
              <ul>
                {tour.highlights?.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>

              {/* Itinerary */}
              <h5>Itinerary</h5>
              <div className="timeline">
                {tour.itinerary?.map((day, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-badge">Day {index + 1}</div>
                    <div className="timeline-content">
                      <h6>{day.title}</h6>
                      <p>{day.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Reviews */}
          <Card>
            <CardBody>
              <h5>Reviews</h5>
              {tour.reviews?.map((review) => (
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
            </CardBody>
          </Card>
        </Col>

        <Col md={4}>
          {/* Booking Form */}
          <div className="sticky-top" style={{ top: '2rem' }}>
            <Card className="price-card mb-4">
              <CardBody>
                <h3 className="text-primary mb-3">
                  {formatPrice(tour.price)}
                  <small className="text-muted">/person</small>
                </h3>
                <hr />
                <BookingForm tour={tour} />
              </CardBody>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TourDetail;
