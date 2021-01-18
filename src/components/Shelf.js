import React, {Component} from "react";
import PropTypes from "prop-types"
import Book from "./Book";

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
                    <ol className="books-grid">
                        {books.map((book) =>
                            (<Book key={book.id} book={book} changeShelf={changeShelf}/>)
                        )}
                    </ol>
                </div>
            </div>
        );
    }
}

export default Shelf
