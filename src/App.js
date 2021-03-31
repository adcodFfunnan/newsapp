import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import { ShowTopHeadlines } from './features/ShowTopHeadlines'
import { Header } from './app/Header'
import { ShowSearchResults } from './features/ShowSearchResults';
import { ShowArticle } from './features/ShowArticle'

const App = () => {
    return (
        <Router>
            <Header />
            <Switch>
                <Route exact path="/"><Redirect to="/breaking-news" /></Route>
                <Route exact path="/breaking-news"><ShowTopHeadlines /></Route>
                <Route exact path="/news"></Route>
                <Route exact path="/travel"></Route>
                <Route exact path="/future"></Route>
                <Route exact path="/culture"></Route>

                <Route exact path="/:query"><ShowSearchResults /></Route>

                <Route exact path="/breaking-news/:article" component={ShowArticle} />
                <Route exact path="/news/:article" component={ShowArticle} />
            </Switch>
        </Router>
    )
}

export default App