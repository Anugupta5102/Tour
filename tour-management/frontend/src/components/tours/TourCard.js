import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle, CardText, Badge } from 'reactstrap';
import { formatPrice, formatDuration, truncateText } from '../../utils/formatters';

const TourCard = ({ tour }) => {
  const {
    _id,
    title,
    location,
    price,
    duration,
    maxGroupSize,
    description,
    images,
    featured
  } = tour;

  return (
    <Card className="tour-card h-100 shadow-sm">
      <div className="position-relative">
        <CardImg
          top
          src={images[0]}
          alt={title}
          className="tour-image"
          style={{ height: '200px', objectFit: 'cover' }}
        />
        {featured && (
          <Badge
            color="warning"
            className="position-absolute"
            style={{ top: '10px', right: '10px' }}
          >
            Featured
          </Badge>
        )}
      </div>
      <CardBody>
        <CardTitle tag="h5">{title}</CardTitle>
        <div className="mb-2 text-muted">
          <i className="ri-map-pin-line me-1"></i>
          {location}
        </div>
        <CardText>{truncateText(description, 100)}</CardText>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>
            <small className="text-muted">
              <i className="ri-time-line me-1"></i>
              {formatDuration(duration)}
            </small>
            <br />
            <small className="text-muted">
              <i className="ri-group-line me-1"></i>
              Max: {maxGroupSize} people
            </small>
          </div>
          <div className="text-end">
            <div className="fw-bold text-primary mb-1">
              {formatPrice(price)}
            </div>
            <Link
              to={`/tours/${_id}`}
              className="btn btn-outline-primary btn-sm"
            >
              View Details
            </Link>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default TourCard;
