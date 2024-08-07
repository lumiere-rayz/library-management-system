import axios from 'axios';

const BOOK_API_BASE_URL = 'http://localhost:8082/books';

const getAllBooks = () => axios.get(BOOK_API_BASE_URL);
const getBookById = (bookId) => axios.get(`${BOOK_API_BASE_URL}/${bookId}`);
const addBook = (book) => axios.post(BOOK_API_BASE_URL, book);
const updateBook = (bookId, book) => axios.put(`${BOOK_API_BASE_URL}/${bookId}`, book);
const deleteBook = (bookId) => axios.delete(`${BOOK_API_BASE_URL}/${bookId}`);

export { getAllBooks, getBookById, addBook, updateBook, deleteBook };
