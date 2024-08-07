import React, { useState, useEffect } from 'react';
import { getAllCustomers, addCustomer, updateCustomer, deleteCustomer } from '../services/customerService';
import '../styles/CustomerList.css';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ name: '', emailId: '', phone: '', street: '', city: '', postalCode: '' });
  const [editCustomer, setEditCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await getAllCustomers();
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleAddCustomer = async () => {
    try {
      if (!newCustomer.emailId) {
        alert('Email ID is required.');
        return;
      }
      await addCustomer(newCustomer);
      setNewCustomer({ name: '', emailId: '', phone: '', street: '', city: '', postalCode: '' });
      fetchCustomers();
    } catch (error) {
      console.error('Error adding customer:', error.response?.data || error.message);
    }
  };

  const handleUpdateCustomer = async (emailId) => {
    try {
      await updateCustomer(emailId, editCustomer);
      setEditCustomer(null);
      fetchCustomers();
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  const handleDeleteCustomer = async (emailId) => {
    try {
      await deleteCustomer(emailId);
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <div className="customer-container">
      <div className="customer-form">
        <h2>Add New Customer</h2>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newCustomer.name}
            onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
          />
          <input
            type="email"
            name="emailId"
            placeholder="Email"
            value={newCustomer.emailId}
            onChange={(e) => setNewCustomer({ ...newCustomer, emailId: e.target.value })}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={newCustomer.phone}
            onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
          />
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={newCustomer.street}
            onChange={(e) => setNewCustomer({ ...newCustomer, street: e.target.value })}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={newCustomer.city}
            onChange={(e) => setNewCustomer({ ...newCustomer, city: e.target.value })}
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={newCustomer.postalCode}
            onChange={(e) => setNewCustomer({ ...newCustomer, postalCode: e.target.value })}
          />
        </div>
        <button className="add-button" onClick={handleAddCustomer}>Add Customer</button>
      </div>

      <div className="customer-list-section">
        <h2>Customer List</h2>
        <ul className="customer-list">
          {customers.map((customer) => (
            <li key={customer.emailId} className="customer-item">
              {editCustomer && editCustomer.emailId === customer.emailId ? (
                <div className="edit-form">
                  <input
                    type="text"
                    value={editCustomer.name}
                    onChange={(e) => setEditCustomer({ ...editCustomer, name: e.target.value })}
                  />
                  <input
                    type="text"
                    value={editCustomer.phone}
                    onChange={(e) => setEditCustomer({ ...editCustomer, phone: e.target.value })}
                  />
                  <button className="save-button" onClick={() => handleUpdateCustomer(customer.emailId)}>Save</button>
                </div>
              ) : (
                <div className="customer-details">
                  <span className="customer-name">{customer.name}</span>
                  <span className="customer-email">{customer.emailId}</span>
                  <span className="customer-phone">{customer.phone}</span>
                  <button className="edit-button" onClick={() => setEditCustomer(customer)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDeleteCustomer(customer.emailId)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomerList;
