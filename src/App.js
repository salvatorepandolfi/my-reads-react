import React from 'react'
import './App.css'
import {Route} from 'react-router-dom'
import Main from "./pages/Main";
import Search from "./pages/Search";
import {update} from './service/BooksService'
import * as BookService from "./service/BooksService";

class BooksApp extends React.Component {

    state = {
        books: []
    }

    async componentDidMount() {
        const books = await BookService.getAll()
        this.setState({books: books})
    }

    changeShelf = async (book, shelf) => {
        const updated = await update(book, shelf)
        if (updated) {
            const books = await BookService.getAll()
            this.setState({books: books})
        }
    }

    render() {
        const {books} = this.state
        return (
            <div className="app">
                {/*{message !== '' && (<div className="notification">{message}</div>)}*/}
                <Route path='/' exact>
                    <Main changeShelf={this.changeShelf} books={books}/>
                </Route>
                <Route path='/search'>
                    <Search changeShelf={this.changeShelf}/>
                </Route>
            </div>
        )
    }
}

export default BooksApp
