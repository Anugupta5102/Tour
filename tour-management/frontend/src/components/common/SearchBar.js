import React, { useState } from 'react';
import { Form, FormGroup, Input, Button, Row, Col } from 'reactstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const SearchBar = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    date: new Date(),
    maxGroupSize: 1
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  return (
    <div className="search-bar p-4 bg-light rounded shadow-sm">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={4}>
            <FormGroup>
              <Input
                type="text"
                placeholder="Where are you going?"
                value={searchParams.location}
                onChange={(e) => setSearchParams(prev => ({
                  ...prev,
                  location: e.target.value
                }))}
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <DatePicker
                selected={searchParams.date}
                onChange={(date) => setSearchParams(prev => ({
                  ...prev,
                  date
                }))}
                className="form-control"
                placeholderText="Select date"
                minDate={new Date()}
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Input
                type="number"
                placeholder="Group size"
                min="1"
                value={searchParams.maxGroupSize}
                onChange={(e) => setSearchParams(prev => ({
                  ...prev,
                  maxGroupSize: parseInt(e.target.value)
                }))}
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <Button color="primary" block>
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SearchBar;
