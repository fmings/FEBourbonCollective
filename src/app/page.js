'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.

import { Button } from 'react-bootstrap';
import { useAuth } from '@/utils/context/authContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import UserRegistrationModalForm from '../components/forms/UserRegistrationModalForm';
import { checkUser } from '../api/userData';
import BourbonCard from '../components/BourbonCard';
import { getBourbons } from '../api/bourbonData';

function Home() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bourbons, setBourbons] = useState([]);
  const router = useRouter();

  const handleModal = () => {
    checkUser(user.uid).then((backendUser) => {
      console.warn('backend user response', backendUser);
      if (!backendUser) {
        setIsModalOpen(true);
      } else {
        setIsModalOpen(false);
      }
    });
  };

  useEffect(() => {
    if (user.uid) {
      handleModal();
    }
  }, [user]);

  const getAllBourbons = () => {
    getBourbons().then(setBourbons);
  };

  useEffect(() => {
    getAllBourbons();
  }, []);

  const handleClick = () => {
    router.push('/bourbon/new');
  };

  return (
    <div>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        {isModalOpen && <UserRegistrationModalForm onClose={() => setIsModalOpen(false)} />}

        <div>Browse Bourbons</div>
        <div>Don&apos;t see what you are looking for?</div>
        <Button onClick={handleClick}>Add a Bourbon</Button>
      </div>
      <div className="d-flex flex-wrap">
        {bourbons.map((bourbon) => (
          <BourbonCard bourbonObj={bourbon} key={bourbon.id} onUpdate={getAllBourbons} />
        ))}
      </div>
    </div>
  );
}

export default Home;
