import React, { useState, useEffect } from 'react';
import { getAllBooks, addBook, updateBook, deleteBook } from '../services/bookService';
import '../styles/BookList.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ bookTitle: '', authorName: '' });
  const [editBook, setEditBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await getAllBooks();
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleAddBook = async () => {
    try {
      await addBook(newBook);
      setNewBook({ bookTitle: '', authorName: '' });
      fetchBooks();
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleUpdateBook = async (bookId) => {
    try {
      await updateBook(bookId, editBook);
      setEditBook(null);
      fetchBooks();
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await deleteBook(bookId);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="book-container">
      <div className="book-form">
        <h2>Add New Book</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Title"
            value={newBook.bookTitle}
            onChange={(e) => setNewBook({ ...newBook, bookTitle: e.target.value })}
          />
          <input
            type="text"
            placeholder="Author"
            value={newBook.authorName}
            onChange={(e) => setNewBook({ ...newBook, authorName: e.target.value })}
          />
        </div>
        <button className="add-button" onClick={handleAddBook}>Add Book</button>
      </div>

      <div className="book-list-section">
        <h2>Book List</h2>
        <ul className="book-list">
          {books.map((book) => (
            <li key={book.bookId} className="book-item">
              {editBook && editBook.bookId === book.bookId ? (
                <div className="edit-form">
                  <input
                    type="text"
                    value={editBook.bookTitle}
                    onChange={(e) => setEditBook({ ...editBook, bookTitle: e.target.value })}
                  />
                  <input
                    type="text"
                    value={editBook.authorName}
                    onChange={(e) => setEditBook({ ...editBook, authorName: e.target.value })}
                  />
                  <button className="save-button" onClick={() => handleUpdateBook(book.bookId)}>Save</button>
                </div>
              ) : (
                <div className="book-details">
                  <span className="book-title">{book.bookTitle}</span>
                  <span className="book-author"> by {book.authorName}, </span>
                  <span className="book-ID"> with book-Id: {book.bookId}</span>
                  <button className="edit-button" onClick={() => setEditBook(book)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDeleteBook(book.bookId)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookList;
