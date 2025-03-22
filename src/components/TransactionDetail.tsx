import React from 'react';

interface TransactionDetailProps {
  transaction: {
    type: string;
    amount: number;
    name: string;
    description: string;
    date: string;
    pending: boolean;
    authorizedUser: string;
    icon: string;
  };
}

const TransactionDetail: React.FC<TransactionDetailProps> = ({ transaction }) => {
  return (
    <div className="transaction-detail">
      <h2>Transaction Details</h2>
      <div>Type: {transaction.type}</div>
      <div>Name: {transaction.name}</div>
      <div>Description: {transaction.description}</div>
      <div>Amount: ${transaction.amount}</div>
      <div>Date: {transaction.date}</div>
      <div>Status: {transaction.pending ? 'Pending' : 'Completed'}</div>
      <div>Authorized User: {transaction.authorizedUser}</div>
    </div>
  );
};

export default TransactionDetail;
