'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function UserCollectionCard({ userProfileObj }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/userBourbon/${userProfileObj.id}`);
  };

  return (
    <Card className="collection-card">
      <Card.Body className="collection-card-body d-flex flex-row align-items-center">
        <div>
          <Card.Title className="user-title">{userProfileObj.username}&apos;s collection</Card.Title>
          <Card.Text>{userProfileObj.numberOfBourbons} bottles</Card.Text>
        </div>
        <div>
          <Button className="view-collection-button" variant="primary" onClick={handleClick}>
            View
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

UserCollectionCard.propTypes = {
  userProfileObj: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    numberOfBourbons: PropTypes.number,
  }),
};
