'use client';

import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function ActiveTradeRequestCard({ pendingTradeRequestObj }) {
  return (
    <Card>
      <Card.Body>
        <Card.Text>
          {pendingTradeRequestObj.requestingUser.username} requests to trade their {pendingTradeRequestObj.requestingFromBourbon.name} for your {pendingTradeRequestObj.requestedFromBourbon.name}
        </Card.Text>
        <Button variant="primary">Accept</Button>
        <Button variant="danger">Reject</Button>
      </Card.Body>
    </Card>
  );
}

ActiveTradeRequestCard.propTypes = {
  pendingTradeRequestObj: PropTypes.shape({
    requestingUser: PropTypes.shape({
      username: PropTypes.string,
    }).isRequired,
    requestingFromBourbon: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
    requestedFromBourbon: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
