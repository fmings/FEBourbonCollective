'use client';

import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { addUserBourbon, deleteUserBourbon, updateUserBourbon } from '../api/userBourbonData';
import { checkUser } from '../api/userData';
import { useAuth } from '../utils/context/authContext';
import TradeRequestModalForm from './forms/TradeRequestModalForm';

export default function BourbonCard({ bourbonObj, userBourbonObj, onUpdate }) {
  const [loggedInUserId, setLoggedInUserId] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  const getUserProfile = () => {
    checkUser(user.uid).then((backendUser) => {
      setLoggedInUserId(backendUser.id);
    });
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const handleTradeRequest = () => {
    setIsModalOpen(true);
  };

  const addBourbonToMyCollection = () => {
    const payload = { ...userBourbonObj, userId: loggedInUserId, bourbonId: bourbonObj.id, openBottle: false, emptyBottle: false };
    addUserBourbon(payload).then(() => {
      onUpdate();
    });
  };

  const toggleOpenBottle = () => {
    const updatedState = !userBourbonObj.openBottle;
    updateUserBourbon(userBourbonObj.id, { ...userBourbonObj, openBottle: updatedState }).then(() => {
      onUpdate();
    });
  };

  const toggleEmptyBottle = () => {
    const updatedState = !userBourbonObj.emptyBottle;
    updateUserBourbon(userBourbonObj.id, { ...userBourbonObj, emptyBottle: updatedState }).then(() => {
      onUpdate();
    });
  };

  const removeUserBourbonFromCollection = () => {
    deleteUserBourbon(userBourbonObj.id).then(() => {
      onUpdate();
    });
  };

  const renderButtons = () => {
    if (userBourbonObj && userBourbonObj.userId === loggedInUserId) {
      return (
        <>
          <Button className="open-close-button" variant="primary" onClick={toggleOpenBottle}>
            {userBourbonObj.openBottle ? 'Open' : 'Closed'}
          </Button>
          <Button className="empty-full-button" variant="primary" onClick={toggleEmptyBottle}>
            {userBourbonObj.emptyBottle ? 'Empty' : 'Full'}
          </Button>
          <Button variant="primary" onClick={removeUserBourbonFromCollection}>
            Remove from My Collection
          </Button>
        </>
      );
    }
    if (userBourbonObj) {
      return (
        <div className="d-flex flex-row align-items-center">
          <div>
            <div>{userBourbonObj.openBottle ? 'Open' : 'Closed'}</div>
            <div>{userBourbonObj.emptyBottle ? 'Empty' : 'Full'}</div>
          </div>
          <div className="ms-auto">
            <Button className="request-trade-button" variant="primary" onClick={handleTradeRequest}>
              Request Trade
            </Button>
          </div>
        </div>
      );
    }
    return (
      <Button className="add-to-collection-button" variant="primary" onClick={addBourbonToMyCollection}>
        Add to My Collection
      </Button>
    );
  };

  return (
    <Card className="bourbon-card">
      {isModalOpen && <TradeRequestModalForm onClose={() => setIsModalOpen(false)} userBourbonObj={userBourbonObj} />}
      <Card.Img className="bourbon-image" variant="top" src={bourbonObj ? bourbonObj.image : userBourbonObj.bourbon.image} />
      <Card.Body>
        <Card.Title className="bourbon-card-bourbon-name">{bourbonObj ? bourbonObj.name : userBourbonObj.bourbon.name}</Card.Title>
        <Card.Title className="bourbon-card-distillary-name">{bourbonObj ? bourbonObj.distillery.name : userBourbonObj.bourbon.distillery.name}</Card.Title>
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
    id: PropTypes.number,
    userId: PropTypes.number,
    openBottle: PropTypes.bool,
    emptyBottle: PropTypes.bool,
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
