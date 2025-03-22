import React from 'react';

const CardBalance: React.FC = () => {
  const cardLimit = 1500;
  const cardBalance = Math.floor(Math.random() * cardLimit);
  const available = cardLimit - cardBalance;

  return (
    <div className="card-balance">
      <div>Maximum card limit: ${cardLimit}</div>
      <div>Card balance: ${cardBalance}</div>
      <div>Available: ${available}</div>
    </div>
  );
};

export default CardBalance;
