import React from 'react';
import { Redirect } from 'react-router';
import {Route} from "react-router-dom";
import {IAppState} from "../../store/types";
import {connect} from "react-redux";

import {PrivateRoutesProps} from './types';
import RouteService from '../../services/route-service';

const PrivateRoute:React.FC<PrivateRoutesProps> = ({children, path, currUser}) => {
    return (
        <Route exact
            path={path}
            render={() => currUser ? <>{children}</> : <Redirect to={RouteService.signInLink} />
            }
        />
    )
}

const mapStateToProps = (state: IAppState) => ({
    currUser: state.currUserInfo
});

export default connect(mapStateToProps)(PrivateRoute);