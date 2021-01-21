import React from 'react'
import './App.css'
import {Route} from 'react-router-dom'
import Main from "./pages/Main";
import Search from "./pages/Search";
import {availableShelfs, update} from './service/BooksService'
import * as BookService from "./service/BooksService";

class BooksApp extends React.Component {

    state = {
        books: [],
        message: ""
    }

    async componentDidMount() {
        const books = await BookService.getAll()
        this.setState({books: books})
    }

    changeShelf = async (book, shelf) => {
        const updated = await update(book, shelf)
        if (updated) {
            const books = await BookService.getAll()
            this.setState({books: books}, () => (this.changeShelfMessage(book.title, shelf)))
        }
    }

    changeShelfMessage = (bookTitle, shelfKey) => {
        let message = `"${bookTitle}" removed from MyReads.`
        if (shelfKey !== 'none') {
            const shelf = availableShelfs.find(s => s.key === shelfKey)
            message = `"${bookTitle}" placed on ${shelf.name} shelf.`
        }
        this.setState({message}, () => {
            setTimeout(() => {
                this.setState({message: ''})
            }, 3500)
        })
    }

    render() {
        const {books, message} = this.state
        return (
            <div className="app">
                <Route path='/' exact>
                    <Main changeShelf={this.changeShelf} books={books}/>
                </Route>
                <Route path='/search'>
                    <Search changeShelf={this.changeShelf}/>
                </Route>
                {message !== '' && (<div className="notification">
                    <div className='message'>{message}</div>
                </div>)}
            </div>
        )
    }
}

export default BooksApp
