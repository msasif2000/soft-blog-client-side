
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import Skeleton from 'react-loading-skeleton';
import './PrivateRoute.css';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    //console.log(location);

    if (loading) {
        return (
          <div className="skeleton-loading">
            <Skeleton height={200} count={5} />
          </div>
        );
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