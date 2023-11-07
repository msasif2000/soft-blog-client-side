import { NavLink } from "react-router-dom";
import './Navbar.css';
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
    const {user} = useContext(AuthContext);
    //console.log(user);
    const cEmail = user?.email;
    return (
        <div className="flex flex-col ml-2 mt-10 p-4">
            <ul className="sty  space-y-4">
                <li><NavLink to='/'>Home</NavLink></li>
                {
                    user? 
                    <li><NavLink to='/createBlog'>Create Blog</NavLink></li>
                    :
                    <li><NavLink to='/login'>Create Blog</NavLink></li>
                }
                <li><NavLink to='/allBlogs'>All Blogs</NavLink></li>
                <li><NavLink to='/featuredBlogs'>Featured Blogs</NavLink></li>
                <li><NavLink to={`/profile/${cEmail}`}>My Blogs</NavLink></li>
                <li><NavLink to={`/wishLists/${cEmail}`}>My Wishlists</NavLink></li>
            </ul>
        </div>
    );
};

export default Navbar;