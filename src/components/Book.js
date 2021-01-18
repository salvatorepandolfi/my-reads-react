import React, {Component} from "react";
import PropTypes from 'prop-types'
import {availableShelfs} from "../service/BooksService";

class Book extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        changeShelf: PropTypes.func.isRequired
    }

    render() {
        const {book, changeShelf} = this.props
                return (<li>
             <div className="book">
               <div className="book-top">
                   <div className="book-cover" style={{
                       width: 128,
                       height: 192,
                       backgroundImage:`url("${book.backgroundImage}")`
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
