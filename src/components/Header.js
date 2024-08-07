import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (
    <header>
      <h1>Library Management System</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/books">Books</Link></li>
          <li><Link to="/customers">Customers</Link></li>
          <li><Link to="/transactions">Transactions</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
