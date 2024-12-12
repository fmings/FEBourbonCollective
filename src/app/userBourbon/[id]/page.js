'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getUserBourbons } from '@/api/userBourbonData';
import BourbonCard from '../../../components/BourbonCard';

export default function UserCollectionDetails() {
  const [userBourbons, setUserBourbons] = useState([]);
  const { id } = useParams();

  const getSingleUserBourbons = () => {
    getUserBourbons(id).then(setUserBourbons);
  };

  useEffect(() => {
    getSingleUserBourbons();
  }, []);

  return (
    <div className="user-collection-page-container">
      <div
        className="d-flex flex-column justify-content-center home-page-header"
        style={{
          height: '15vh',
          marginLeft: '30px',
        }}
      >
        <h1>{userBourbons[0]?.user?.username ? `${userBourbons[0]?.user?.username}'s collection` : ``}</h1>
      </div>
      <div className="d-flex flex-wrap align-items-center bourbon-cards-container">{userBourbons.length > 0 ? userBourbons.map((userBourbon) => <BourbonCard userBourbonObj={userBourbon} key={userBourbon.id} onUpdate={getSingleUserBourbons} />) : <div>No bourbons found in this collection.</div>}</div>
    </div>
  );
}
