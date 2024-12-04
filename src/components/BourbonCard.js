'use client';

import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { addUserBourbon } from '../api/userBourbonData';
import { checkUser } from '../api/userData';
import { useAuth } from '../utils/context/authContext';

export default function BourbonCard({ bourbonObj, userBourbonObj, onUpdate }) {
  const [loggedInUserId, setLoggedInUserId] = useState(0);
  const { user } = useAuth();

  const getUserProfile = () => {
    checkUser(user.uid).then((backendUser) => {
      setLoggedInUserId(backendUser.id);
    });
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const addBourbonToMyCollection = () => {
    const payload = { ...userBourbonObj, userId: loggedInUserId, bourbonId: bourbonObj.id, openBottle: false, emptyBottle: false };
    addUserBourbon(payload).then(() => {
      onUpdate();
    });
  };

  const renderButtons = () => {
    if (userBourbonObj && userBourbonObj.userId === loggedInUserId) {
      return (
        <>
          <Button variant="primary">Closed</Button>
          <Button variant="primary">Full</Button>
          <Button variant="primary">Remove from My Collection</Button>
        </>
      );
    }
    if (userBourbonObj) {
      return <Button variant="primary">Request Trade</Button>;
    }
    return (
      <Button variant="primary" onClick={addBourbonToMyCollection}>
        Add to My Collection
      </Button>
    );
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={bourbonObj ? bourbonObj.image : userBourbonObj.bourbon.image} height="200" />
      <Card.Body>
        <Card.Title>{bourbonObj ? bourbonObj.name : userBourbonObj.bourbon.name}</Card.Title>
        <Card.Title>{bourbonObj ? bourbonObj.distillery.name : userBourbonObj.bourbon.distillery.name}</Card.Title>
        {renderButtons()}
      </Card.Body>
    </Card>
  );
}

BourbonCard.propTypes = {
  bourbonObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.number,
    distillery: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
  }).isRequired,
  userBourbonObj: PropTypes.shape({
    userId: PropTypes.number,
    bourbon: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      distillery: PropTypes.shape({
        name: PropTypes.string,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
