import { format } from 'date-fns';

export const formatDate = (date) => {
  return format(new Date(date), 'MMM dd, yyyy');
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const formatDuration = (days) => {
  return `${days} ${days === 1 ? 'day' : 'days'}`;
};

export const calculateTotalPrice = (basePrice, numberOfPeople) => {
  return basePrice * numberOfPeople;
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};
