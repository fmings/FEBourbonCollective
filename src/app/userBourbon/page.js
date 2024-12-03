'use client';

import React, { useEffect, useState } from 'react';
import UserCollectionCard from '../../components/UserCollectionCard';
import { getUsers } from '../../api/userData';

export default function AllCollections() {
  const [userProfiles, setUserProfiles] = useState([]);

  const getAllUserProfiles = () => {
    getUsers().then(setUserProfiles);
  };

  useEffect(() => {
    getAllUserProfiles();
  }, []);

  return (
    <div>
      All User Collections Page
      {userProfiles.map((userProfile) => (
        <UserCollectionCard userProfileObj={userProfile} key={userProfile.id} />
      ))}
    </div>
  );
}
