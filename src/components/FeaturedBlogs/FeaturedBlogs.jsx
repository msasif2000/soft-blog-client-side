import { useLoaderData } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import BlogSection from "../../Pages/AllBlogs/BlogSection";


const FeaturedBlogs = () => {
    const featuredBlogs = useLoaderData();
    //console.log(featuredBlogs);
    return (
        <div>
            <Header></Header>
            <div className="md:flex">
                <div className="lg:w-1/5 md:w-2/6">
                    <Navbar></Navbar>
                </div>
                <div className="p-2 gap-4 lg:w-4/6 mx-auto md:w-5/6">
                    <h2 className="text-2xl font-bold text-center">Featured Blogs</h2>
                    {
                        featuredBlogs.map(blog => <BlogSection key={blog._id} blog={blog}></BlogSection>)
                    }
                </div>
            </div>
        </div>
    );
};

export default FeaturedBlogs;