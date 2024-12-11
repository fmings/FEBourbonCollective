'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/utils/context/authContext';
import UserCollectionCard from '../../components/UserCollectionCard';
import { checkUser, getUsers } from '../../api/userData';

export default function AllCollections() {
  const [userProfiles, setUserProfiles] = useState([]);
  const [loggedInProfile, setLoggedInProfile] = useState({});
  const { user } = useAuth();

  const getUserProfile = () => {
    checkUser(user.uid).then(setLoggedInProfile);
  };

  const getAllUserProfiles = () => {
    getUsers().then((allUsers) => {
      const filteredUsers = allUsers.filter((userObj) => userObj.id !== loggedInProfile.id);
      setUserProfiles(filteredUsers);
    });
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  useEffect(() => {
    if (loggedInProfile) {
      getAllUserProfiles();
    }
  }, [loggedInProfile]);

  return (
    <div className="d-flex flex-column align-items-center">
      <div
        className="text-center d-flex flex-column justify-content-center align-items-center home-page-header"
        style={{
          height: '15vh',
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        <h1>All Collections</h1>
      </div>
      <div className="collection-cards-container">
        {userProfiles.map((userProfile) => (
          <UserCollectionCard userProfileObj={userProfile} key={userProfile.id} />
        ))}
      </div>
    </div>
  );
}
