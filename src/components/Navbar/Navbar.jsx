import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="flex flex-col ml-2 mt-10">
            <Link to='/'>Home</Link>
            <Link to='/createBlog'>Create Blog</Link>
            <Link to='/allBlogs'>All Blogs</Link>
            <Link to='/featuredBlogs'>Featured Blogs</Link>
            <Link to='/wishList'>Wishlist</Link>
        </div>
    );
};

export default Navbar;