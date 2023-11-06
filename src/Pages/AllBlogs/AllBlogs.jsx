import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import BlogSection from "./BlogSection";
import Footer from "../../components/Footer/Footer";


const AllBlogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/allBlogs')
            .then(res => res.json())
            .then(data =>
                setBlogs(data))
    }, [])
    return (
        <div className="md:container mx-auto">
            <div className=" md:flex">
                <div className="lg:w-1/5 md:w-2/6">
                    <Navbar></Navbar>
                </div>
                <div className=" p-2 gap-4  lg:w-4/5 md:w-5/6">
                    {
                        blogs.map(blog => <BlogSection key={blog._id} blog={blog}></BlogSection>)
                    }
                </div>

            </div>
            <Footer></Footer>
        </div>
    );
};

export default AllBlogs;