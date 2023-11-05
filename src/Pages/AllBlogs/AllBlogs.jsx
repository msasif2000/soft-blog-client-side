import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import BlogSection from "./BlogSection";


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
            <Navbar></Navbar>
            <div className=" p-2 gap-4">
                {
                    blogs.map(blog => <BlogSection key={blog._id} blog={blog}></BlogSection>)
                }
            </div>
        </div>
    );
};

export default AllBlogs;