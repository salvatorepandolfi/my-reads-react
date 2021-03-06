import * as BookAPI from './BooksAPI'

const marshal = (book) => {
    const thumbnail = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail :
        (book.imageLinks && book.imageLinks.smallThumbnail ? book.imageLinks.smallThumbnail : 'https://via.placeholder.com/128x192.png')

    const authors = book.authors ? book.authors.join(', ') : ''
    return {
        id: book.id,
        title: book.title,
        authors: authors,
        shelf: book.shelf ? book.shelf : 'none',
        backgroundImage: thumbnail
    }
}

const arrayMarshall = (books) => {
    const marshalled = []
    if (books.length > 0) {
        for (let book of books) {
            marshalled.push(marshal(book))
        }
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
    let books = await BookAPI.search(query)
    let booksInShelfs = await getAll()
    booksInShelfs = booksInShelfs.map(book => ({id: book.id, shelf: book.shelf}))
    books.length>0 && books.map(book => {
        let shelf = 'none'
        const found = booksInShelfs.find(b => b.id === book.id)
        if (found)
            shelf = found.shelf
        book.shelf = shelf
        return book
    })
    return arrayMarshall(books)
}

export const printableShelfs = [
    {key: 'currentlyReading', name: 'Currently Reading'},
    {key: 'wantToRead', name: 'Want to Read'},
    {key: 'read', name: 'Read'},
]

export const availableShelfs = [
    ...printableShelfs,
    {key: 'none', name: 'None'}
]


