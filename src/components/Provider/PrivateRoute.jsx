
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

import './PrivateRoute.css';
import Skeleton from "react-loading-skeleton";

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    //console.log(location);

    if (loading) {
        // return  <span className="loading loading-infinity loading-lg flex justify-center mx-auto mt-36"></span>
        return <p className="mt-12 w-[300px] mx-auto"><Skeleton count={5} height={40} highlightColor="red"  className="skeleton-loading" /></p>
      }
    

    if(user){
        return children
    }
    return <Navigate to='/login' state={{ from: location }}></Navigate>
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
export default PrivateRoute;