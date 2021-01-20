import React, {Component} from "react";
import {Link} from 'react-router-dom'
import * as BookService from '../service/BooksService'
import BooksGrid from "../components/BooksGrid";
import PropTypes from 'prop-types'

class Search extends Component {

    static propTypes = {
        changeShelf: PropTypes.func.isRequired
    }

    state = {
        books: [],
        filter: '',
        typing: false,
        initSearch: true,
        searchTimeout: 0
    }

    search = (query) => {
        if (query) {
            if (this.state.searchTimeout) {
                clearTimeout(this.state.searchTimeout)
            }

            this.setState({
                filter: query,
                typing: true,
                initSearch: false,
                searchTimeout: setTimeout(() => {
                    this.books = BookService.search(this.state.filter)
                        .then((books) => {
                            this.setState({books: books, typing: false})
                        })
                }, 500)

            })
        }
    }

    message = () => {
        const {books, typing, initSearch} = this.state
        return initSearch ? 'Start typing to search...' : typing ? 'Searching...' : books.length === 0 && 'No results found'
    }

    render() {
        const {books} = this.state
        const {changeShelf} = this.props

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/'>
                        <button className="close-search">
                            Close
                        </button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input type="text" placeholder="Search by title or author" onChange={(e) => {
                            this.search(e.target.value)
                        }}/>

                    </div>
                </div>
                <div className="search-books-results">
                    <div className='message-box'>{this.message()}</div>
                    <BooksGrid books={books} changeShelf={changeShelf}/>
                </div>
            </div>
        );
    }
}

export default Search
