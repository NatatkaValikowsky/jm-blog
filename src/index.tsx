import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import App from './components/app';
import Articles from './layouts/articles';
import Article from './layouts/article';

ReactDOM.render(
    <BrowserRouter>
        <App>
            <Switch>
                <Route exact path="/" component={Articles} />
                <Route exact path="/articles" component={Articles} />
                <Route exact path="/articles/:slug" component={Article} />
            </Switch>
        </App>
    </BrowserRouter>,
    document.getElementById('root'),
);