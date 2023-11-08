import { NavLink } from "react-router-dom";
import './Navbar.css';
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className="flex flex-col lg:ml-2 md:mt-6 md:p-4 lg:p-2 md:w-full w-1/3">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/allBlogs'>All Blogs</NavLink></li>
                        <li><NavLink to='/featuredBlogs'>Featured Blogs</NavLink></li>
                        {
                            user ? (
                                <>
                                    <li><NavLink to='/createBlog'>Create Blog</NavLink></li>
                                    <li><NavLink to='/profile'>My Blogs</NavLink></li>
                                    <li><NavLink to='/wishLists'>My Wishlists</NavLink></li>
                                </>
                            ) : (
                                <li><NavLink to='/login'>Create Blog</NavLink></li>
                            )
                        }
                    </ul>
                </div>

            </div>

            <ul className="md:flex flex-col hidden sty space-y-4 ">
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to='/allBlogs'>All Blogs</NavLink></li>
                <li><NavLink to='/featuredBlogs'>Featured Blogs</NavLink></li>
                <li><NavLink to='/createBlog'>Create Blog</NavLink></li>
                <li><NavLink to='/profile'>My Blogs</NavLink></li>
                <li><NavLink to='/wishLists'>My Wishlists</NavLink></li>
                {/* {
                    user ? (
                        <>
                            <li><NavLink to='/createBlog'>Create Blog</NavLink></li>
                            <li><NavLink to='/profile'>My Blogs</NavLink></li>
                            <li><NavLink to='/wishLists'>My Wishlists</NavLink></li>
                        </>
                    ) : (
                        <li><NavLink to='/login'>Create Blog</NavLink></li>
                    )
                } */}

            </ul>
        </div>
    );
};

export default Navbar;
