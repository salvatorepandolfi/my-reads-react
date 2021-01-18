import React, {Component} from "react";
import PropTypes from 'prop-types'
import {availableShelf} from "../service/BooksService";

class Book extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        changeShelf: PropTypes.func.isRequired
    }

    render() {
        const {book, changeShelf} = this.props
        const availableShelfs = availableShelf()
        (<li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128,
                        height: 192,
                        backgroundImage: 'url("http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api")'
                    }}></div>
                    <div className="book-shelf-changer">
                        <select value={book.shelf}>
                            <option value="move" disabled>Move to...</option>
                            {availableShelfs.map((shelf) => (
                                <option value={shelf.key}>{shelf.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </li>)
    }
}

export default Book
