'use client';

import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { updateTradeRequest } from '@/api/tradeRequestData';
import { addUserBourbon, deleteUserBourbon } from '@/api/userBourbonData';

export default function ActiveTradeRequestCard({ pendingTradeRequestObj, onUpdate }) {
  const handleAccept = () => {
    const payload = { ...pendingTradeRequestObj, pending: false, approved: true };
    const addRequestingUserBourbonPayload = {
      userId: pendingTradeRequestObj.requestingUser.id,
      bourbonId: pendingTradeRequestObj.requestedFromBourbonId,
      openBottle: false,
      emptyBottle: false,
    };
    const addRequestedFromUserBourbonPayload = {
      userId: pendingTradeRequestObj.requestedFromUser.id,
      bourbonId: pendingTradeRequestObj.requestingBourbonId,
      openBottle: false,
      emptyBottle: false,
    };
    const operations = [updateTradeRequest(pendingTradeRequestObj.id, payload), addUserBourbon(addRequestingUserBourbonPayload), addUserBourbon(addRequestedFromUserBourbonPayload), deleteUserBourbon(pendingTradeRequestObj.requestedFromUserBourbonId), deleteUserBourbon(pendingTradeRequestObj.requestingUserBourbonId)];

    Promise.all(operations).then(() => {
      onUpdate();
    });
  };

  const handleReject = () => {
    const payload = { ...pendingTradeRequestObj, pending: false };
    updateTradeRequest(pendingTradeRequestObj.id, payload).then(() => {
      onUpdate();
    });
  };

  return (
    <Card>
      <Card.Body>
        <Card.Text>
          {pendingTradeRequestObj.requestingUser.username} requests to trade their {pendingTradeRequestObj.requestingFromBourbon.name} for your {pendingTradeRequestObj.requestedFromBourbon.name}
        </Card.Text>
        <Button variant="primary" onClick={handleAccept}>
          Accept
        </Button>
        <Button variant="danger" onClick={handleReject}>
          Reject
        </Button>
      </Card.Body>
    </Card>
  );
}

ActiveTradeRequestCard.propTypes = {
  pendingTradeRequestObj: PropTypes.shape({
    id: PropTypes.number,
    requestingUser: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
    }).isRequired,
    requestedFromUser: PropTypes.shape({
      id: PropTypes.number,
    }).isRequired,
    requestingFromBourbon: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
    requestedFromBourbon: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
    requestedFromBourbonId: PropTypes.number,
    requestingBourbonId: PropTypes.number,
    requestedFromUserBourbonId: PropTypes.number,
    requestingUserBourbonId: PropTypes.number,
    userBourbonId: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
