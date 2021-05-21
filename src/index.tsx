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

import PrivateRoute from "./components/private-route";

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

                        <Route exact path={[RouteService.mainRoute, RouteService.articlesRoute]}>
                            <Articles />
                        </Route>

                        <Route exact path={RouteService.articleRoute}>
                            <Article />
                        </Route>

                        <PrivateRoute path={RouteService.editArticleRoute}>
                            <EditArticle />
                        </PrivateRoute>

                        <Route exact path={RouteService.signInRoute}>
                            <SignIn />
                        </Route>

                        <Route exact path={RouteService.signUpRoute}>
                            <SignUp />
                        </Route>

                        <PrivateRoute path={RouteService.profileRouter}>
                            <Profile />
                        </PrivateRoute>

                        <PrivateRoute path={RouteService.createArticleRoute}>
                            <CreateArticle />
                        </PrivateRoute>

                    </Switch>
                </App>
            </CookiesProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
);