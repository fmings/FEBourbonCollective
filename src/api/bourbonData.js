import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getBourbons = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/bourbons`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const addBourbon = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/bourbons`, {
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

const searchBourbon = (query) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/bourbons/search?searchValue=${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

export { getBourbons, addBourbon, searchBourbon };
