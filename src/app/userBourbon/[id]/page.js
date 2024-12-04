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
    <div>
      User Collection Details Page
      {userBourbons.length > 0 ? userBourbons.map((userBourbon) => <BourbonCard userBourbonObj={userBourbon} key={userBourbon.id} onUpdate={getSingleUserBourbons} />) : <div>No bourbons found in this collection.</div>};
    </div>
  );
}
