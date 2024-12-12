'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Form } from 'react-bootstrap';
import { addBourbon } from '../../api/bourbonData';
import getDistilleries from '../../api/distilleryData';
import { useAuth } from '../../utils/context/authContext';
import { checkUser, getSingleUser } from '../../api/userData';

const initialBourbonState = {
  distilleryId: '',
  name: '',
  image: '',
};
export default function AddBourbonForm() {
  const router = useRouter();
  const { user } = useAuth();
  const [bourbonFormInput, setBourbonFormInput] = useState(initialBourbonState);
  const [userProfile, setUserProfile] = useState({});
  const [distilleries, setDistilleries] = useState([]);

  const getUserProfile = () => {
    checkUser(user.uid).then((backendUser) => {
      getSingleUser(backendUser.id).then(setUserProfile);
    });
  };

  const getAllDistilleries = () => {
    getDistilleries().then(setDistilleries);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBourbonFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const createBourbon = () => {
      const payload = { ...bourbonFormInput, userId: userProfile.id };
      addBourbon(payload).then(() => {
        router.push('/');
      });
    };
    createBourbon();
  };

  useEffect(() => {
    getUserProfile();
    getAllDistilleries();
  }, []);

  return (
    <Form id="add-bourbon-form">
      <h1 className="add-bourbon-header">Add a Bourbon</h1>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Distillery</Form.Label>
        <Form.Select aria-label="Default select example" name="distilleryId" value={bourbonFormInput.distilleryId} onChange={handleChange} required>
          <option value="">Select distillery</option>
          {distilleries.map((distillery) => (
            <option key={distillery.id} value={distillery.id}>
              {distillery.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Bourbon Brand/Name</Form.Label>
        <Form.Control type="text" placeholder="Enter the Brand/Name" name="name" value={bourbonFormInput.name} onChange={handleChange} required autoFocus />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
        <Form.Label>Bourbon Image</Form.Label>
        <Form.Control type="text" placeholder="link to image" name="image" value={bourbonFormInput.image} onChange={handleChange} required autoFocus />
      </Form.Group>
      <div className="d-flex justify-content-center">
        <Button className="submit-button add-bourbon-submit-button" type="submit" variant="primary" onClick={handleSubmit}>
          Add
        </Button>
      </div>
    </Form>
  );
}
