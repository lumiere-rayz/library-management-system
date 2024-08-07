import React, { useState, useEffect } from 'react';
import { getAllTransactions, addTransaction, updateTransaction, deleteTransaction } from '../services/transactionService';
import '../styles/TransactionList.css';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({ customerEmailId: '', bookId: '', trxnDate: '', trxnType: 'checkin' });
  const [editTransaction, setEditTransaction] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await getAllTransactions();
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleAddTransaction = async () => {
    try {
      await addTransaction(newTransaction);
      setNewTransaction({ customerEmailId: '', bookId: '', trxnDate: '', trxnType: 'checkin' });
      fetchTransactions();
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const handleUpdateTransaction = async (transactionId) => {
    try {
      await updateTransaction(transactionId, editTransaction);
      setEditTransaction(null);
      fetchTransactions();
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const handleDeleteTransaction = async (transactionId) => {
    try {
      await deleteTransaction(transactionId);
      fetchTransactions();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <div className="transaction-container">
      <div className="transaction-form">
        <h2>Add New Transaction</h2>
        <div className="form-group">
          <input
            type="email"
            placeholder="Customer Email"
            value={newTransaction.customerEmailId}
            onChange={(e) => setNewTransaction({ ...newTransaction, customerEmailId: e.target.value })}
          />
          <input
            type="text"
            placeholder="Book ID"
            value={newTransaction.bookId}
            onChange={(e) => setNewTransaction({ ...newTransaction, bookId: e.target.value })}
          />
          <input
            type="date"
            placeholder="Transaction Date"
            value={newTransaction.trxnDate}
            onChange={(e) => setNewTransaction({ ...newTransaction, trxnDate: e.target.value })}
          />
          <select
            value={newTransaction.trxnType}
            onChange={(e) => setNewTransaction({ ...newTransaction, trxnType: e.target.value })}
          >
            <option value="checkin">Checkin</option>
            <option value="checkout">Checkout</option>
          </select>
        </div>
        <button className="add-button" onClick={handleAddTransaction}>Add Transaction</button>
      </div>

      <div className="transaction-list-section">
        <h2>Transaction List</h2>
        <ul className="transaction-list">
          {transactions.map((transaction) => (
            <li key={transaction.transactionId} className="transaction-item">
              {editTransaction && editTransaction.transactionId === transaction.transactionId ? (
                <div className="edit-form">
                  <input
                    type="email"
                    value={editTransaction.customerEmailId}
                    onChange={(e) => setEditTransaction({ ...editTransaction, customerEmailId: e.target.value })}
                  />
                  <input
                    type="text"
                    value={editTransaction.bookId}
                    onChange={(e) => setEditTransaction({ ...editTransaction, bookId: e.target.value })}
                  />
                  <input
                    type="date"
                    value={editTransaction.trxnDate}
                    onChange={(e) => setEditTransaction({ ...editTransaction, trxnDate: e.target.value })}
                  />
                  <select
                    value={editTransaction.trxnType}
                    onChange={(e) => setEditTransaction({ ...editTransaction, trxnType: e.target.value })}
                  >
                    <option value="checkin">Checkin</option>
                    <option value="checkout">Checkout</option>
                  </select>
                  <button className="save-button" onClick={() => handleUpdateTransaction(transaction.transactionId)}>Save</button>
                </div>
              ) : (
                <div className="transaction-details">
                  <span className="transaction-info">{transaction.customerEmailId} checked out book ID {transaction.bookId} on {transaction.trxnDate} ({transaction.trxnType})</span>
                  <button className="edit-button" onClick={() => setEditTransaction(transaction)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDeleteTransaction(transaction.transactionId)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransactionList;
