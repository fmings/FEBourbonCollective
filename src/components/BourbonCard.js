import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getUserBourbons } from '../api/userBourbonData';
import { checkUser } from '../api/userData';
import { useAuth } from '../utils/context/authContext';

export default function BourbonCard({ bourbonObj }) {
  const [userBourbons, setUserBourbons] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(0);
  const { user } = useAuth();

  const getUserProfile = () => {
    checkUser(user.uid).then((backendUser) => {
      setLoggedInUserId(backendUser.id);
    });
  };

  useEffect(() => {
    getUserBourbons(loggedInUserId).then(setUserBourbons);
    getUserProfile();
  }, []);

  const isBourbonOnUserList = () => {
    if (userBourbons.length > 0) {
      return userBourbons.some((userBourbon) => userBourbon.bourbonId === bourbonObj.id && userBourbon.userId === loggedInUserId);
    }
    return false;
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={bourbonObj.image} height="200" />
      <Card.Body>
        <Card.Title>{bourbonObj.name}</Card.Title>
        <Card.Title>{bourbonObj.distillery.name}</Card.Title>
        {isBourbonOnUserList() ? (
          <>
            <Button variant="primary">Closed</Button>
            <Button variant="primary">Full</Button>
            <Button variant="primary">Remove from My Collection</Button>
          </>
        ) : (
          <Button variant="primary">Add to My Collection</Button>
        )}
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
};
