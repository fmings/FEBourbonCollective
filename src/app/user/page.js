'use client';

import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../utils/context/authContext';
import { checkUser, getSingleUser } from '../../api/userData';

export default function UserProfile() {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState({});
  const router = useRouter();

  const getUserProfile = () => {
    checkUser(user.uid).then((backendUser) => {
      getSingleUser(backendUser.id).then(setUserProfile);
    });
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const handleClick = () => {
    router.push('/tradeRequest');
  };

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-items-center profile-container"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '1000px',
        margin: '0 auto',
      }}
    >
      <div className="profile-name">{userProfile.fullName}</div>
      <div className="profile-username">{userProfile.username}</div>
      <div className="profile-city-state">
        {userProfile.city}, {userProfile.state}
      </div>
      <div className="profile-number-of-bourbons">{userProfile.numberOfBourbons} Bottles of Bourbon</div>
      <Button className="view-trade-requests-button" onClick={handleClick}>
        View Trade Requests
      </Button>
    </div>
  );
}
