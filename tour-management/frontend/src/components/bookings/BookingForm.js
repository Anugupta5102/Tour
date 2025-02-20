import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import DatePicker from 'react-datepicker';
import { useAuth } from '../../context/AuthContext';
import { createBooking } from '../../services/api';
import { formatPrice, calculateTotalPrice } from '../../utils/formatters';

const BookingForm = ({ tour, hotel }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [booking, setBooking] = useState({
    startDate: new Date(),
    endDate: new Date(),
    numberOfPeople: 1,
    roomType: hotel ? hotel.roomTypes[0]?.type : null
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate('/login', { state: { from: window.location.pathname } });
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const bookingData = {
        tourId: tour?._id,
        hotelId: hotel?._id,
        startDate: booking.startDate,
        endDate: booking.endDate,
        numberOfPeople: booking.numberOfPeople,
        roomType: booking.roomType,
        totalAmount: calculateTotalAmount()
      };

      const response = await createBooking(bookingData);
      navigate(`/payment/${response.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalAmount = () => {
    if (tour) {
      return calculateTotalPrice(tour.price, booking.numberOfPeople);
    }
    if (hotel) {
      const room = hotel.roomTypes.find(r => r.type === booking.roomType);
      const nights = Math.ceil(
        (booking.endDate - booking.startDate) / (1000 * 60 * 60 * 24)
      );
      return room.price * nights;
    }
    return 0;
  };

  return (
    <div className="booking-form p-4 bg-light rounded shadow-sm">
      <h4 className="mb-4">Book {tour ? 'Tour' : 'Hotel'}</h4>
      {error && <Alert color="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Start Date</Label>
          <DatePicker
            selected={booking.startDate}
            onChange={date => setBooking(prev => ({ ...prev, startDate: date }))}
            minDate={new Date()}
            className="form-control"
          />
        </FormGroup>
        {hotel && (
          <FormGroup>
            <Label>End Date</Label>
            <DatePicker
              selected={booking.endDate}
              onChange={date => setBooking(prev => ({ ...prev, endDate: date }))}
              minDate={booking.startDate}
              className="form-control"
            />
          </FormGroup>
        )}
        <FormGroup>
          <Label>Number of People</Label>
          <Input
            type="number"
            min="1"
            max={tour?.maxGroupSize || 10}
            value={booking.numberOfPeople}
            onChange={e => setBooking(prev => ({
              ...prev,
              numberOfPeople: parseInt(e.target.value)
            }))}
          />
        </FormGroup>
        {hotel && (
          <FormGroup>
            <Label>Room Type</Label>
            <Input
              type="select"
              value={booking.roomType}
              onChange={e => setBooking(prev => ({
                ...prev,
                roomType: e.target.value
              }))}
            >
              {hotel.roomTypes.map(room => (
                <option key={room.type} value={room.type}>
                  {room.type} - {formatPrice(room.price)}/night
                </option>
              ))}
            </Input>
          </FormGroup>
        )}
        <div className="d-flex justify-content-between align-items-center mt-4">
          <div>
            <small className="text-muted">Total Amount:</small>
            <div className="h4 mb-0 text-primary">
              {formatPrice(calculateTotalAmount())}
            </div>
          </div>
          <Button
            color="primary"
            size="lg"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Book Now'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default BookingForm;
