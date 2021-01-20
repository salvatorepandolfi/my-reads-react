import React from 'react'
import './App.css'
import {Route} from 'react-router-dom'
import Main from "./pages/Main";
import Search from "./pages/Search";

class BooksApp extends React.Component {
    changeShelf = () => {
        console.log("changeShelf")
    }

    render() {
        return (
            <div className="app">
                {/*{message !== '' && (<div className="notification">{message}</div>)}*/}
                <Route path='/' exact>
                    <Main changeShelf={this.changeShelf}/>
                </Route>
                <Route path='/search'>
                    <Search changeShelf={this.changeShelf}/>
                </Route>
            </div>
        )
    }
}

export default BooksApp
