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
    <Card>
        <Card.Body>
          <Card.Title>{userProfileObj.username}&apos;s collection</Card.Title>
          <Card.Text>{userProfileObj.numberOfBourbons} bottles</Card.Text>
          <Button variant="primary" onClick={handleClick}>
            View Collection
          </Button>
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
