import React from 'react';

interface TransactionCardProps {
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

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
  const { type, amount, name, description, date, pending, authorizedUser, icon } = transaction;

  return (
    <div className="transaction-card">
      <div className="transaction-icon" style={{ backgroundColor: icon }}>
        <i className="fas fa-credit-card" /> {/* Example FontAwesome icon */}
      </div>
      <div className="transaction-info">
        <div>
          <strong>{type}: ${amount}</strong>
        </div>
        <div>{name}</div>
        <div>{description}</div>
        <div>{date}</div>
        {pending && <span>Pending</span>}
        {authorizedUser && <div>Authorized by: {authorizedUser}</div>}
      </div>
    </div>
  );
};

export default TransactionCard;
