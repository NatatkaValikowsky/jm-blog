import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import { Provider } from "react-redux";
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

import App from './components/app';
import Articles from './layouts/articles';
import Article from './layouts/article';
import SignUp from "./layouts/sign-up";
import SignIn from "./layouts/sign-in";
import Profile from "./layouts/profile";
import CreateArticle from "./layouts/create-article";
import EditArticle from "./layouts/edit-article";

import RootReducer from './store/reducers';

const middlewares = [thunk];

const store = createStore(
    RootReducer,
    composeWithDevTools(applyMiddleware(...middlewares)));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <CookiesProvider>
                <App>
                    <Switch>
                        <Route exact path="/" component={Articles} />
                        <Route exact path="/articles" component={Articles} />
                        <Route exact path="/articles/:slug" component={Article} />
                        <Route exact path="/articles/:slug/edit" component={EditArticle} />
                        <Route exact path="/sign-in" component={SignIn} />
                        <Route exact path="/sign-up" component={SignUp} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/new-article" component={CreateArticle} />
                    </Switch>
                </App>
            </CookiesProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
);