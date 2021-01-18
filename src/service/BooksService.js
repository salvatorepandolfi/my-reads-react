import * as BookAPI from './BooksAPI'
import React from "react";

const marshal = (book) => {
    const thumbnail = book.imageLink && book.imageLink.thumbnail ? book.imageLink.thumbnail :
        book.imageLink && book.imageLink.smallThumbnail ? book.imageLink.smallThumbnail : 'https://via.placeholder.com/128x192.png'
    const toreturn = {
        id: book.id,
        title: book.title,
        authors: book.authors.join(', '),
        shelf: book.shelf,
        backgroundImage: thumbnail
    }
    return toreturn
}

const arrayMarshall = (books) => {
    const marshalled = []
    for (let book of books) {
        marshalled.push(marshal(book))
    }
    return marshalled
}

export const get = async (bookId) => {
    const book = await BookAPI.get(bookId)
    return marshal(book)
}

export const getAll = async () => {
    const books = await BookAPI.getAll()
    return arrayMarshall(books)
}

export const update = async (book, shelf) => {
    return await BookAPI.update(book, shelf)
}

export const search = async (query) => {
    const books = await BookAPI.search(query)
    return arrayMarshall(books)
}

export const availableShelf = () => {
    return [
        {key: 'currentlyReading', name: 'Currently Reading'},
        {key: 'wantToRead', name: 'Want to Read'},
        {key: 'read', name: 'Read'},
        {key: 'none', name: 'None'}
    ]
}
