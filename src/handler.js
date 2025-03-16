import { nanoid } from "nanoid";
import books from "./books.js";

// Handler untuk menambahkan buku baru
const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload || {};

    if (!name) {
        return h.response({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku",
        }).code(400).header("Content-Type", "application/json");
    }

    if (readPage > pageCount) {
        return h.response({
            status: "fail",
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
        }).code(400).header("Content-Type", "application/json");
    }

    const id = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook = { id, name, year, author, summary, publisher, pageCount,
                    readPage, finished, reading, insertedAt, updatedAt };
    books.push(newBook);

    return h.response({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: { bookId: id },
    }).code(201).header("Content-Type", "application/json");
};

// Handler untuk mendapatkan semua buku
const getAllBooksHandler = (request, h) => {
    const bookList = books.map(({ id, name, publisher }) => ({ id, name, publisher }));
    return h.response({
        status: "success",
        data: { books: bookList },
    }).code(200).header("Content-Type", "application/json");
};

// Handler untuk mendapatkan buku berdasarkan ID
const getBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const book = books.filter((book) => book.id === bookId)[0];

    if (!book) {
        return h.response({
            status: "fail",
            message: "Buku tidak ditemukan",
        }).code(404).header("Content-Type", "application/json");
    }

    return h.response({
        status: "success",
        data: { book },
    }).code(200).header("Content-Type", "application/json");
};

// Handler untuk memperbarui buku berdasarkan ID
const editBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    if (!name) {
        return h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Mohon isi nama buku",
        }).code(400).header("Content-Type", "application/json");
    }

    if (readPage > pageCount) {
        return h.response({
            status: "fail",
            message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        }).code(400).header("Content-Type", "application/json");
    }

    const index = books.findIndex((book) => book.id === bookId);
    if (index === -1) {
        return h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Id tidak ditemukan",
        }).code(404).header("Content-Type", "application/json");
    }

    const finished = pageCount === readPage;
    const updatedAt = new Date().toISOString();
    books[index] = { ...books[index], name, year, author, summary, publisher,
                    pageCount, readPage, reading, finished, updatedAt };

    return h.response({
        status: "success",
        message: "Buku berhasil diperbarui",
    }).code(200).header("Content-Type", "application/json");
};

// Handler untuk menghapus buku berdasarkan ID
const deleteBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const index = books.findIndex((book) => book.id === bookId);

    if (index === -1) {
        return h.response({
            status: "fail",
            message: "Buku gagal dihapus. Id tidak ditemukan",
        }).code(404).header("Content-Type", "application/json");
    }

    books.splice(index, 1);
    return h.response({
        status: "success",
        message: "Buku berhasil dihapus",
    }).code(200).header("Content-Type", "application/json");
};

export { addBookHandler,
    getAllBooksHandler,
    getBookByIdHandler,
    editBookByIdHandler,
    deleteBookByIdHandler };
