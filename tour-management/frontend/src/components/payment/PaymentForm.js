import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Alert, Button } from 'reactstrap';
import { createPaymentIntent, confirmPayment } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ booking }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const initializePayment = async () => { 
      try {
        const response = await createPaymentIntent(booking.totalAmount);
        setClientSecret(response.data.clientSecret);
      } catch (err) {
        setError('Failed to initialize payment');
      } finally {
        setLoading(false);
      }
    };

    initializePayment();
  }, [booking.totalAmount]);

  const handlePayment = async () => {
    const elements="";
    try {
      setLoading(true);
      const stripe = await stripePromise;
      
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements?.getElement('card'),
          billing_details: {
            name: booking.userId.name,
          },
        },
      });

      if (error) {
        setError(error.message);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        await confirmPayment(booking._id, paymentIntent.id);
        navigate('/bookings', { 
          state: { success: true, message: 'Payment successful!' }
        });
      }
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <Alert color="danger">{error}</Alert>;

  return (
    <div className="payment-form p-4 bg-light rounded shadow-sm">
      <h4 className="mb-4">Payment Details</h4>
      <div className="mb-4">
        <div id="card-element">
          {/* Stripe Card Element will be inserted here */}
        </div>
      </div>
      <Button
        color="primary"
        size="lg"
        block
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </Button>
    </div>
  );
};

export default PaymentForm;
