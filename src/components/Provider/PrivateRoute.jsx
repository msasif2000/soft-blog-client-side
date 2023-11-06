
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
//import Skeleton from 'react-loading-skeleton';
import './PrivateRoute.css';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    //console.log(location);

    if (loading) {
        return  <span className="loading loading-infinity loading-lg flex justify-center mx-auto mt-36"></span>
      }
    

    if(user){
        return children
    }
    return <Navigate state={location.pathname} to="/login"></Navigate>;
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
export default PrivateRoute;