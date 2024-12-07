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
    <div>
      Trade Request Page
      {pendingTradeRequests.map((pendingTradeRequest) => (
        <ActiveTradeRequestCard pendingTradeRequestObj={pendingTradeRequest} key={pendingTradeRequest.id} onUpdate={getAllPendingTradeRequests} />
      ))}
    </div>
  );
}
