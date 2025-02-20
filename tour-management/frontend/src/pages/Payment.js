import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import PaymentForm from '../components/payment/PaymentForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { getUserBookings } from '../services/api';
import { formatPrice } from '../utils/formatters';

const Payment = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await getUserBookings();
        const foundBooking = response.data.find(b => b._id === bookingId);
        if (!foundBooking) {
          throw new Error('Booking not found');
        }
        setBooking(foundBooking);
      } catch (err) {
        setError(err.message);
        setTimeout(() => navigate('/bookings'), 3000);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId, navigate]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-danger">{error}</div>;
  if (!booking) return <div className="text-center">Booking not found</div>;

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <CardBody>
              <h3 className="mb-4">Complete Your Payment</h3>
              
              {/* Booking Summary */}
              <div className="booking-summary mb-4">
                <h5>Booking Summary</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span>Booking Reference:</span>
                  <span className="text-muted">{booking._id}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>{booking.tourId ? 'Tour' : 'Hotel'}:</span>
                  <span className="text-muted">
                    {booking.tourId?.title || booking.hotelId?.name}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Date:</span>
                  <span className="text-muted">
                    {new Date(booking.startDate).toLocaleDateString()}
                    {booking.hotelId && ` - ${new Date(booking.endDate).toLocaleDateString()}`}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Number of People:</span>
                  <span className="text-muted">{booking.numberOfPeople}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Total Amount:</span>
                  <span className="h5 text-primary mb-0">
                    {formatPrice(booking.totalAmount)}
                  </span>
                </div>
              </div>

              {/* Payment Form */}
              <PaymentForm booking={booking} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Payment;
