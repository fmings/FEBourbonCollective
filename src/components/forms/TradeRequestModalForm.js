import { addTradeRequest } from '@/api/tradeRequestData';
import { getUserBourbons } from '@/api/userBourbonData';
import { checkUser } from '@/api/userData';
import { useAuth } from '@/utils/context/authContext';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

const initialTradeRequestState = {
  requestingBourbonId: null,
};

export default function TradeRequestModalForm({ userBourbonObj, onClose }) {
  const [loggedInUserBourbons, setLoggedInUserBourbons] = useState([]);
  const [loggedInProfile, setLoggedInProfile] = useState({});
  const [tradeRequestFormInput, setTradeRequestFormInput] = useState(initialTradeRequestState);
  const { user } = useAuth();
  const { id } = useParams();
  const router = useRouter();

  const getAllLoggedInUserBourbons = () => {
    checkUser(user.uid).then((userProfile) => {
      setLoggedInProfile(userProfile);
      getUserBourbons(userProfile.id).then(setLoggedInUserBourbons);
    });
  };

  useEffect(() => {
    getAllLoggedInUserBourbons();
  }, []);

  const handleClose = () => {
    onClose();
    router.push(`/userBourbon/${id}`);
  };

  const handleTradeRequestChange = (e) => {
    const { name, value } = e.target;
    setTradeRequestFormInput((prevState) => ({
      ...prevState,
      [name]: name === 'requestingBourbonId' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const createTradeRequest = () => {
      const payload = {
        ...tradeRequestFormInput,
        requestingUserId: loggedInProfile.id,
        requestedFromUserId: userBourbonObj.userId,
        requestedFromBourbonId: userBourbonObj.bourbonId,
        pending: true,
        approved: false,
      };
      addTradeRequest(payload).then(() => {
        onClose();
        router.push(`/userBourbon/${id}`);
      });
    };
    createTradeRequest();
  };

  return (
    <Modal show>
      {console.warn('userbourbonobj', userBourbonObj)}
      <Modal.Header>
        <Modal.Title className="modal-heading">Trade Request</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="trade-request-form">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Select the bourbon from your collection that you would like to trade...</Form.Label>
            <Form.Select aria-label="Default select example" name="requestingBourbonId" value={tradeRequestFormInput.requestingBourbonId} onChange={handleTradeRequestChange} required>
              <option value="">Select distillery</option>
              {loggedInUserBourbons.map((loggedInUserBourbon) => (
                <option key={loggedInUserBourbon.bourbon.id} value={loggedInUserBourbon.bourbon.id}>
                  {loggedInUserBourbon.bourbon.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button type="submit" form="trade-request-form" variant="primary" onClick={handleSubmit}>
          Submit Request
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

TradeRequestModalForm.propTypes = {
  userBourbonObj: PropTypes.shape({
    userId: PropTypes.number,
    bourbonId: PropTypes.number,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
