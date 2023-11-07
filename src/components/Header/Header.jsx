import { Link } from "react-router-dom";
import logo from '../../assets/images/logo.jfif'
import { GrUser } from "react-icons/gr";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
const Header = () => {
    const { user, userLogout } = useContext(AuthContext);

    const handleUserLogout = () => {
        userLogout();
    }
    return (
        <div>
            <div className="navbar mb-8">
                <div className="flex-1">
                    <img src={logo} alt="" className="h-12 w-12 rounded-lg" />
                    <Link to='/' className="ml-2 font-bold normal-case text-2xl text-orange-600">Soft <span className="text-orange-800">Blog</span></Link>
                </div>
                <div className="flex-none gap-2">
                    {
                        user ?
                            <>
                                <Link to='/profile'>
                                    {
                                        user?.photoURL ?

                                            <div className="dropdown dropdown-end">
                                                <img src={user.photoURL} alt="" className="h-12 w-12 rounded-full border-sky-300 border-2" />
                                            </div>
                                            :
                                            <img src="https://i.ibb.co/NVLwTNM/manager.jpg" alt="" className="h-12 w-12 rounded-full border-sky-300 border-2" />
                                    }
                                </Link>
                                <button onClick={handleUserLogout} className="btn btn-sm bg-orange-600 text-white">Logout</button>
                            </>

                            :
                            <>
                                <div className="dropdown dropdown-end">
                                    <GrUser className="text-2xl"></GrUser>
                                </div>
                                <Link to='/login'><button className="btn btn-sm  bg-orange-600 text-white">Login</button></Link>
                                <Link to='/register'><button className="btn btn-sm border border-orange-600 text-orange-600">Register</button></Link>
                            </>
                    }

                </div>
            </div>
        </div>
    );
};

export default Header;