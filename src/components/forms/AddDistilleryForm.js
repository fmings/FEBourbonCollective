import { addDistillery } from '@/api/distilleryData';
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';

const initialFormState = {
  name: '',
  city: '',
  state: '',
};

export default function AddDistilleryForm({ onClose }) {
  const router = useRouter();
  const [distilleryFormInput, setDistilleryFormInput] = useState(initialFormState);

  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;
    setDistilleryFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const createNewDistillery = () => {
      const payload = { ...distilleryFormInput };
      addDistillery(payload).then(() => {
        onClose();
      });
    };
    createNewDistillery();
  };

  const handleClose = () => {
    onClose();
    router.push(`/bourbon/new`);
  };

  return (
    <Modal show>
      <Modal.Header className="text-center">
        <Modal.Title className="modal-heading text-center">Add a Distillery</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="add-distillery-form">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Distillery Name</Form.Label>
            <Form.Control type="text" placeholder="Enter the distillery name..." name="name" value={distilleryFormInput.name} onChange={handleRegistrationChange} required autoFocus />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="Enter city..." name="city" value={distilleryFormInput.city} onChange={handleRegistrationChange} required autoFocus />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
            <Form.Label>State</Form.Label>
            <Form.Control type="text" placeholder="Enter state..." name="state" value={distilleryFormInput.state} onChange={handleRegistrationChange} required autoFocus />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <Button variant="secondary" className="close-button" onClick={handleClose}>
          Close
        </Button>
        <Button type="submit" form="add-distillery-form" variant="primary" className="submit-button" onClick={handleSubmit}>
          Add Distillery
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

AddDistilleryForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};
