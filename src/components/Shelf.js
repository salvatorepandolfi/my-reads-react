import React, {Component} from "react";
import PropTypes from "prop-types"
import BooksGrid from "./BooksGrid";

class Shelf extends Component {

    static propTypes = {
        shelf: PropTypes.object.isRequired,
        books: PropTypes.array.isRequired,
        changeShelf: PropTypes.func.isRequired
    }

    render() {
        const {books, shelf, changeShelf} = this.props
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf.name}</h2>
                <div className="bookshelf-books">
                    <BooksGrid books={books} changeShelf={changeShelf}/>
                </div>
            </div>
        );
    }
}

export default Shelf
