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
    <>
      <div>{userProfile.fullName}</div>
      <div>{userProfile.username}</div>
      <div>
        {userProfile.city}, {userProfile.state}
      </div>
      <div>{userProfile.numberOfBourbons}</div>
      <Button onClick={handleClick}>View Trade Requests</Button>
    </>
  );
}
