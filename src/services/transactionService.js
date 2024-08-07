import axios from 'axios';

const TRANSACTION_API_BASE_URL = 'http://localhost:8083/transactions';

const getAllTransactions = () => axios.get(TRANSACTION_API_BASE_URL);
const getTransactionById = (transactionId) => axios.get(`${TRANSACTION_API_BASE_URL}/${transactionId}`);
const addTransaction = (transaction) => axios.post(TRANSACTION_API_BASE_URL, transaction);
const updateTransaction = (transactionId, transaction) => axios.put(`${TRANSACTION_API_BASE_URL}/${transactionId}`, transaction);
const deleteTransaction = (transactionId) => axios.delete(`${TRANSACTION_API_BASE_URL}/${transactionId}`);
const getRecentTransactions = () => axios.get(`${TRANSACTION_API_BASE_URL}/recent`);
export { getAllTransactions, getTransactionById, addTransaction, updateTransaction, deleteTransaction, getRecentTransactions };
