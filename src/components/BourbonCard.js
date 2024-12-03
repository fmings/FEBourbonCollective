'use client';

import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { addUserBourbon, getUserBourbons } from '../api/userBourbonData';
import { checkUser } from '../api/userData';
import { useAuth } from '../utils/context/authContext';

export default function BourbonCard({ bourbonObj, userBourbonObj, onUpdate }) {
  const [userBourbons, setUserBourbons] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(0);
  const [bourbonOnUserList, setBourbonOnUserList] = useState(false);
  const { user } = useAuth();

  const getUserProfile = () => {
    checkUser(user.uid).then((backendUser) => {
      setLoggedInUserId(backendUser.id);
    });
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  useEffect(() => {
    if (loggedInUserId) {
      getUserBourbons(loggedInUserId).then(setUserBourbons);
    }
  }, []);

  useEffect(() => {
    if (userBourbons.length > 0) {
      const isOnList = userBourbons.some((userBourbon) => userBourbon.bourbonId === bourbonObj.id);
      setBourbonOnUserList(isOnList);
    }
  }, [userBourbons, bourbonObj]);

  useEffect(() => {
    console.warn('userBourbons', userBourbons);
    console.warn('bourbononuserlist after state update', bourbonOnUserList);
  });

  // const isBourbonOnUserList = () => {
  //         return userBourbons.some((userBourbon) => {
  //       const isOnList = userBourbon.bourbonId === bourbonObj.id;
  //       console.warn('isonlist', isOnList)
  //       return isOnList
  //     });
  //    };

  // const bourbonOnUserList = isBourbonOnUserList();
  const addBourbonToMyCollection = () => {
    const payload = { ...userBourbonObj, userId: loggedInUserId, bourbonId: bourbonObj.id, openBottle: false, emptyBottle: false };
    addUserBourbon(payload).then(() => {
      onUpdate();
    });
  };

  const renderButtons = () => {
    if (bourbonOnUserList) {
      return (
        <>
          <Button variant="primary">Closed</Button>
          <Button variant="primary">Full</Button>
          <Button variant="primary">Remove from My Collection</Button>
        </>
      );
    }
    if (userBourbonObj && !bourbonOnUserList) {
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
