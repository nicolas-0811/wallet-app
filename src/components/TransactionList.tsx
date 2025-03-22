import React, { useState, useEffect } from 'react';
import TransactionCard from "./TransactionCard"
import CardBalance  from './CardBalance';
import DailyPoints  from './DailyPoints';
import NoPaymentDue  from './NoPaymentDue';

const TransactionList: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    // Load test data from a JSON file
    const fetchData = async () => {
      const response = await fetch('./data/transactions.json');
      const data = await response.json();
      setTransactions(data.transactions);
    };

    fetchData();
  }, []);

  return (
    <div className="transaction-list">
      <CardBalance />
      <NoPaymentDue />
      <DailyPoints />
      <div className="latest-transactions">
        <h2>Latest Transactions</h2>
        {transactions.slice(0, 10).map((transaction, index) => (
          <TransactionCard key={index} transaction={transaction} />
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
