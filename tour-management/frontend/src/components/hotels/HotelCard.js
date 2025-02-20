import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';
import { formatPrice } from '../../utils/formatters';

const HotelCard = ({ hotel }) => {
  const {
    _id,
    name,
    location,
    rating,
    images,
    description,
    roomTypes
  } = hotel;

  const minPrice = Math.min(...roomTypes.map(room => room.price));

  return (
    <Card className="hotel-card h-100 shadow-sm">
      <CardImg
        top
        src={images[0]}
        alt={name}
        className="hotel-image"
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <CardBody>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <CardTitle tag="h5">{name}</CardTitle>
          <div className="rating">
            <i className="ri-star-fill text-warning"></i>
            <span className="ms-1">{rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="mb-2 text-muted">
          <i className="ri-map-pin-line me-1"></i>
          {location}
        </div>
        <CardText>{description.substring(0, 100)}...</CardText>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>
            <small className="text-muted">Starting from</small>
            <div className="fw-bold text-primary">
              {formatPrice(minPrice)}/night
            </div>
          </div>
          <Link
            to={`/hotels/${_id}`}
            className="btn btn-outline-primary btn-sm"
          >
            View Details
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};

export default HotelCard;
