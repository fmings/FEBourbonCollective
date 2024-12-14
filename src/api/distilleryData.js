import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getDistilleries = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/distilleries`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const addDistillery = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/distilleries`, {
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

export { getDistilleries, addDistillery };
