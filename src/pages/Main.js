import React, {Component} from "react";
import PropsTypes from 'prop-types'
import {Link} from 'react-router-dom'
import * as BookService from "../service/BooksService";
import Shelf from "../components/Shelf";

class Main extends Component {
    static propTypes = {
        changeShelf: PropsTypes.func.isRequired
    }
    state = {
        books: []
    }

    async componentDidMount() {
        try {
            const books = await BookService.getAll()
            this.setState({books: books})
        } catch (e) {

        }
    }

    render() {
        const {books} = this.state
        const {changeShelf} = this.props
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {BookService.printableShelfs.map((shelf) =>
                            (<Shelf
                                key={shelf.key}
                                shelf={shelf}
                                books={books.filter((book) => (book.shelf === shelf.key))}
                                changeShelf={changeShelf}
                            />)
                        )}
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>
                        <button type='button'>
                            Add a book
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Main
