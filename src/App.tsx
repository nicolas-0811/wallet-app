import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import transactionsData from "./data/transactions.json";
import { Transaction } from "./types/Transaction";
import { calculateDailyPoints } from "./utils/calculatePoints";
import { faCreditCard, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";

// CardBalance Component
const CardBalance: React.FC = () => {
  const limit = 1500;
  const balance = Math.floor(Math.random() * limit);
  const available = limit - balance;
  return (
    <div className="card">
      <h2>Card Balance</h2>
      <p>Maximum Limit: ${limit}</p>
      <p>Balance: ${balance}</p>
      <p>Available: ${available}</p>
    </div>
  );
};

// NoPaymentDue Component
const NoPaymentDue: React.FC = () => (
  <div className="card">
    <h2>No Payment Due</h2>
    <p>You've paid your balance</p>
  </div>
);

// DailyPoints Component
const DailyPoints: React.FC = () => (
  <div className="card">
    <h2>Daily Points</h2>
    <p>{calculateDailyPoints()} points</p>
  </div>
);

// TransactionCard Component
const TransactionCard: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  const dateObj = new Date(transaction.date);
  const today = new Date();
  const diffDays = (today.getTime() - dateObj.getTime()) / (1000 * 3600 * 24);
  const formattedDate =
    diffDays <= 7
      ? dateObj.toLocaleDateString("en-US", { weekday: "long" })
      : dateObj.toLocaleDateString();

  return (
    <Link to={`/transaction/${transaction.id}`} className="transaction-card">
      <div className="icon" style={{ backgroundColor: `hsl(${Math.random() * 360}, 50%, 30%)` }}>
        <FontAwesomeIcon icon={transaction.type === "Payment" ? faMoneyBillWave : faCreditCard} />
      </div>
      <div>
        <p><strong>{transaction.name}</strong></p>
        <p>
          {transaction.pending && <span>Pending - </span>}
          {transaction.description}
        </p>
        <p>
          {transaction.authorizedUser && <span>{transaction.authorizedUser} - </span>}
          {formattedDate}
        </p>
      </div>
      <div className="amount {transaction.type === 'Payment' ? 'positive' : 'negative'}">
        {transaction.type === "Payment" ? "+" : "-"}${transaction.amount}
      </div>
    </Link>
  );
};

// TransactionsList Component
const TransactionsList: React.FC = () => {
  const transactions = transactionsData.slice(0, 10);
  return (
    <div className="container">
      <CardBalance />
      <NoPaymentDue />
      <DailyPoints />
      <div className="card">
        <h2>Latest Transactions</h2>
        {transactions.map((t) => (
          <TransactionCard key={t.id} transaction={t} />
        ))}
      </div>
    </div>
  );
};

// TransactionDetail Component
const TransactionDetail: React.FC = () => {
  const { id } = useParams();
  const transaction = transactionsData.find((t) => t.id === Number(id));

  if (!transaction) return <p>Transaction not found.</p>;

  return (
    <div className="container">
      <div className="card">
        <h2>{transaction.name} Details</h2>
        <p>Status: {transaction.pending ? "Pending" : "Completed"}</p>
        <p>Card Name: {transaction.name}</p>
        <p>Total: ${transaction.amount}</p>
        <p>Description: {transaction.description}</p>
        <p>Date: {transaction.date}</p>
        {transaction.authorizedUser && <p>Authorized User: {transaction.authorizedUser}</p>}
        <Link to="/">Back to Transactions</Link>
      </div>
    </div>
  );
};

// App Component
const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<TransactionsList />} />
      <Route path="/transaction/:id" element={<TransactionDetail />} />
    </Routes>
  </Router>
);

export default App;
