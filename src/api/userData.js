import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const checkUser = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/users/checkUser/${uid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const registerUser = (userDetails) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getSingleUser = (userId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getUsers = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { checkUser, registerUser, getSingleUser, getUsers };
