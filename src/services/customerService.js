import axios from 'axios';

const CUSTOMER_API_BASE_URL = 'http://localhost:8081/customers';

const getAllCustomers = () => axios.get(CUSTOMER_API_BASE_URL);
const getCustomerById = (emailId) => axios.get(`${CUSTOMER_API_BASE_URL}/${emailId}`);
const addCustomer = (customer) => axios.post(CUSTOMER_API_BASE_URL, customer);
const updateCustomer = (emailId, customer) => axios.put(`${CUSTOMER_API_BASE_URL}/${emailId}`, customer);
const deleteCustomer = (emailId) => axios.delete(`${CUSTOMER_API_BASE_URL}/${emailId}`);

export { getAllCustomers, getCustomerById, addCustomer, updateCustomer, deleteCustomer };
