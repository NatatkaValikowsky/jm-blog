import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import { Provider } from "react-redux";
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import RouteService from "./services/route-service";

import App from './components/app';
import Articles from './components/articles';
import Article from './components/article-page';
import SignUp from "./components/sign-up";
import SignIn from "./components/sign-in";
import Profile from "./components/profile";
import CreateArticle from "./components/create-article";
import EditArticle from "./components/edit-article";

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
                        <Route exact path={RouteService.mainRoute} component={Articles} />
                        <Route exact path={RouteService.articlesRoute} component={Articles} />
                        <Route exact path={RouteService.articleRoute} component={Article} />
                        <Route exact path={RouteService.editArticleRoute} component={EditArticle} />
                        <Route exact path={RouteService.signInRoute} component={SignIn} />
                        <Route exact path={RouteService.signUpRoute} component={SignUp} />
                        <Route exact path={RouteService.profileRouter} component={Profile} />
                        <Route exact path={RouteService.createArticleRoute} component={CreateArticle} />
                    </Switch>
                </App>
            </CookiesProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
);