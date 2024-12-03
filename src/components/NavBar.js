/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { checkUser } from '@/api/userData';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  const { user } = useAuth();
  const [loggedInProfile, setLoggedInProfile] = useState({});

  const getUserProfile = () => {
    checkUser(user.uid).then(setLoggedInProfile);
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/" className="navbar-brand">
          <img src="\images\BourbonCollectiveLogoLight.png" alt="bourbon collective logo" width="175" />
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link className="nav-link" href="/">
              Home
            </Link>
            <Link className="nav-link" href="/userBourbon">
              All Collections
            </Link>
            <Link className="nav-link" href={`/userBourbon/${loggedInProfile.id}`}>
              My Collection
            </Link>
            <Link className="nav-link" href="/user">
              My Profile
            </Link>
          </Nav>

          <Button variant="danger" onClick={signOut}>
            Sign Out
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
