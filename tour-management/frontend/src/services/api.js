import axios from 'axios';

const API_URL = 'http://localhost:6000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);

// Tours API
export const getAllTours = (params) => api.get('/tours', { params });
export const getTourById = (id) => api.get(`/tours/${id}`);
export const createTour = (tourData) => api.post('/tours', tourData);
export const updateTour = (id, tourData) => api.put(`/tours/${id}`, tourData);
export const deleteTour = (id) => api.delete(`/tours/${id}`);

// Hotels API
export const getAllHotels = (params) => api.get('/hotels', { params });
export const getHotelById = (id) => api.get(`/hotels/${id}`);
export const createHotel = (hotelData) => api.post('/hotels', hotelData);
export const updateHotel = (id, hotelData) => api.put(`/hotels/${id}`, hotelData);
export const deleteHotel = (id) => api.delete(`/hotels/${id}`);
export const checkHotelAvailability = (id, dates) => api.post(`/hotels/${id}/check-availability`, dates);

// Bookings API
export const createBooking = (bookingData) => api.post('/bookings', bookingData);
export const getUserBookings = () => api.get('/bookings/user');
export const updateBookingStatus = (id, status) => api.put(`/bookings/${id}`, { status });
export const cancelBooking = (id) => api.delete(`/bookings/${id}`);

// Payments API
export const createPaymentIntent = (amount) => api.post('/payments/create-payment-intent', { amount });
export const confirmPayment = (bookingId, paymentIntentId) => 
  api.post(`/payments/confirm/${bookingId}`, { paymentIntentId });

// Reviews API
export const addReview = (tourId, reviewData) => api.post(`/tours/${tourId}/reviews`, reviewData);
export const getReviews = (tourId) => api.get(`/tours/${tourId}/reviews`);

export default api;
