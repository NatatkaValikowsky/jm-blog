import React from 'react';
import { Redirect } from 'react-router';
import {Route} from "react-router-dom";
import {IAppState} from "../../store/types";
import {connect} from "react-redux";

import {PrivateRoutesProps} from './types';

const PrivateRoute:React.FC<PrivateRoutesProps> = ({children, path, currUser}) => {
    return (
        <Route exact
            path={path}
            render={() => currUser ? <>{children}</> : <Redirect to="/sign-in"/>
            }
        />
    )
}

const mapStateToProps = (state: IAppState) => ({
    currUser: state.currUserInfo
});

export default connect(mapStateToProps)(PrivateRoute);