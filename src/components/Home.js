import React, { useState, useEffect } from 'react';
import { getRecentTransactions } from '../services/transactionService';
import '../styles/Home.css';

const Home = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchRecentTransactions();
  }, []);

  const fetchRecentTransactions = async () => {
    try {
      const response = await getRecentTransactions();
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  return (
    <div className="home-container">
      <div className="overlay">
        <div className="recent-transactions">
          <h2>Recent Transactions</h2>
          <ul className="transaction-list">
            {transactions.map((transaction) => (
              <li key={transaction.id} className="transaction-item">
                <div className="transaction-details">
                  <p>
                    <strong>Customer Email:</strong> {transaction.customerEmailId}
                  </p>
                  <p>
                    <strong>Book ID:</strong> {transaction.bookId}
                  </p>
                  <p>
                    <strong>Transaction Date:</strong> {transaction.trxnDate}
                  </p>
                  <p>
                    <strong>Transaction Type:</strong> {transaction.trxnType}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
