import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getUserBourbons = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/userBourbons`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const addUserBourbon = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/userBourbons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const updateUserBourbon = (userBourbonId, payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/userBourbons/${userBourbonId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const deleteUserBourbon = (userBourbonId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/userBourbons/${userBourbonId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.text())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getUserBourbons, addUserBourbon, updateUserBourbon, deleteUserBourbon };
