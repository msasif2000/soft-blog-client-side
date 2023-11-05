import { Link } from "react-router-dom";
import logo from '../../assets/images/logo.jfif'
import { GrUser } from "react-icons/gr";
const Header = () => {
    return (
        <div>
            <div className="navbar">
                <div className="flex-1">
                    <img src={logo} alt="" className="h-12 w-12 rounded-lg" />
                    <Link to='/' className="ml-2 font-bold normal-case text-2xl text-orange-600">Soft <span className="text-orange-800">Blog</span></Link>
                </div>
                <div className="flex-none gap-2">
                    <button className="btn btn-sm">Login</button>
                    <div className="dropdown dropdown-end">
                        <GrUser className="text-2xl"></GrUser>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;