import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { connect } from 'react-redux';

import Header from '../header/header';
import './app.css';
import {fetchCurrentUser as fetchCurrentUserAction, removeCurrentUser as removeCurrentUserAction} from '../../store/actions';
import { IAppState } from '../../store/types';

interface AppProps{
    fetchCurrentUser: (token: string) => void,
    removeCurrentUser: () => void,
    children: React.ReactNode,
    currUser: {
        username: string,
        email: string,
        bio: string | null,
        image: string | null
    }
}

const App: React.FC<AppProps> = ({
                                     fetchCurrentUser,
                                     removeCurrentUser,
                                     currUser,
                                     children }) => {
    const [cookies,, removeCookie] = useCookies(['Token']);

    useEffect(function (){
        if(cookies.Token){
            fetchCurrentUser(cookies.Token);
        }
    }, []);

    const logout = () => {
        removeCurrentUser();
        removeCookie('Token');
    }

    return (
        <div className="main-outer">
            <Header currUser={currUser} onLogout={logout}/>
            <div className="wrapper">
                {children}
            </div>
        </div>
    )
};

const mapStateToProps = (state: IAppState) => ({
    currUser: state.currUserInfo
});

const mapDispatchToProps = {
    fetchCurrentUser: fetchCurrentUserAction,
    removeCurrentUser: removeCurrentUserAction
}

export default connect(mapStateToProps, mapDispatchToProps)(App);