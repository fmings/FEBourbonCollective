import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getPendingTradeRequests = (userId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/tradeRequests/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const addTradeRequest = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/tradeRequests`, {
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

const updateTradeRequest = (tradeRequestId, payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/tradeRequests/${tradeRequestId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const deleteTradeRequest = (tradeRequestId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/tradeRequests/${tradeRequestId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.text())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getPendingTradeRequests, addTradeRequest, updateTradeRequest, deleteTradeRequest };
