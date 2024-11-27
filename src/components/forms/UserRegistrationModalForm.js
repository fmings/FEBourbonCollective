import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../utils/context/authContext';
import { registerUser } from '../../api/userData';

const initialRegistrationState = {
  firebaseId: '',
  username: '',
  fullName: '',
  email: '',
  city: '',
  state: '',
};
export default function UserRegistrationModalForm({ onClose }) {
  const router = useRouter();
  const { user } = useAuth();
  const [registrationFormInput, setRegistrationFormInput] = useState(initialRegistrationState);

  const handleClose = () => {
    onClose();
    router.push('/');
  };

  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;
    setRegistrationFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const createRegisteredUser = () => {
      const payload = { ...registrationFormInput, firebaseId: user.uid };
      registerUser(payload).then(() => {
        onClose();
        router.push('/');
      });
    };
    createRegisteredUser();
  };

  return (
    <Modal show>
      <Modal.Header>
        <Modal.Title className="modal-heading">Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="registration-form">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your full name..." name="fullName" value={registrationFormInput.fullName} onChange={handleRegistrationChange} required autoFocus />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter your username..." name="username" value={registrationFormInput.username} onChange={handleRegistrationChange} required autoFocus />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" name="email" value={registrationFormInput.email} onChange={handleRegistrationChange} required autoFocus />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="Enter your city..." name="city" value={registrationFormInput.city} onChange={handleRegistrationChange} required autoFocus />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
            <Form.Label>State</Form.Label>
            <Form.Control type="text" placeholder="Enter your state..." name="state" value={registrationFormInput.state} onChange={handleRegistrationChange} required autoFocus />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button type="submit" form="registration-form" variant="primary" onClick={handleSubmit}>
          Register
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

UserRegistrationModalForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};
