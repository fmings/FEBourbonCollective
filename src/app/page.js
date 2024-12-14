'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.

import { Button } from 'react-bootstrap';
import { useAuth } from '@/utils/context/authContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SearchBox from '@/components/SearchBox';
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
    <div className="d-flex flex-column align-items-center">
      <div
        className="text-center d-flex flex-column justify-content-center align-items-center home-page-header"
        style={{
          height: '28vh',
          padding: '30px',
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        {isModalOpen && <UserRegistrationModalForm onClose={() => setIsModalOpen(false)} />}

        <h1>Browse Bourbons</h1>
        <div>Don&apos;t see what you are looking for?</div>
        <Button className="add-bourbon-button" onClick={handleClick}>
          Add a Bourbon
        </Button>
      </div>
      <div>
        <SearchBox />
      </div>
      <div className="d-flex flex-wrap align-items-center bourbon-cards-container">
        {bourbons.map((bourbon) => (
          <BourbonCard bourbonObj={bourbon} key={bourbon.id} onUpdate={getAllBourbons} />
        ))}
      </div>
    </div>
  );
}

export default Home;
