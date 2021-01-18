import React from 'react'
import './App.css'
import {Route} from 'react-router-dom'
import Main from "./pages/Main";
import Search from "./pages/Search";

class BooksApp extends React.Component {
    render() {
        return (
            <div className="app">
                {/*{message !== '' && (<div className="notification">{message}</div>)}*/}
                <Route path='/' exact component={Main}/>
                <Route path='/search' component={Search}/>
            </div>
        )
    }
}

export default BooksApp
