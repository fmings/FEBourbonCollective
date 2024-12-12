'use client';

import React, { useEffect, useState } from 'react';
import { getPendingTradeRequests } from '@/api/tradeRequestData';
import { useAuth } from '@/utils/context/authContext';
import { checkUser } from '@/api/userData';
import ActiveTradeRequestCard from '../../components/ActiveTradeRequestCard';

export default function TradeRequest() {
  const [pendingTradeRequests, setPendingTradeRequests] = useState([]);
  const { user } = useAuth();

  const getAllPendingTradeRequests = () => {
    checkUser(user.uid).then((backendUser) => {
      getPendingTradeRequests(backendUser.id).then(setPendingTradeRequests);
    });
  };

  useEffect(() => {
    getAllPendingTradeRequests();
  }, []);

  return (
    <div className="trade-requests-page-container">
      <div
        className="d-flex flex-column justify-content-center home-page-header"
        style={{
          height: '15vh',
          marginLeft: '30px',
        }}
      >
        <h1>Pending Trade Requests</h1>
      </div>
      <div className="d-flex flex-column align-items-center">
        <div className="trade-request-cards-container">
          {pendingTradeRequests.map((pendingTradeRequest) => (
            <ActiveTradeRequestCard pendingTradeRequestObj={pendingTradeRequest} key={pendingTradeRequest.id} onUpdate={getAllPendingTradeRequests} />
          ))}
        </div>
      </div>
    </div>
  );
}
