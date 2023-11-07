import { Link } from "react-router-dom";
import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import HomeBlog from "../../components/HomeBlog/HomeBlog";

import Navbar from "../../components/Navbar/Navbar";
import RightSide from "../../components/RighSide/RightSide";
import { useEffect, useState } from "react";

const Home = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/allBlogs')
            .then(res => res.json())
            .then(data =>
                setBlogs(data.slice(0, 6)))
    }, [])
    //console.log(blogs);
    return (
        <div>
            <Header></Header>
            <div className="flex gap-6">
                <div className="w-1/5">
                    <Navbar></Navbar>
                </div>
                <div className="w-3/5 flex flex-col  items-center justify-center">
                    <Banner></Banner>

                    <h2 className="text-2xl font-bold text-center mt-12 bg-orange-600 p-2 text-white rounded">Recent Blogs</h2>
                    <div>
                        {
                            blogs.map(blog => <HomeBlog key={blog._id} blog={blog}></HomeBlog>)
                        }
                    </div>
                    <div className="pt-4">
                        <Link to='/allBlogs'><button className="btn btn-sm bg-orange-600 text-white">See More Blog...</button></Link>
                    </div>
                </div>
                <div className="w-1/5 mr-2">
                    <RightSide></RightSide>
                </div>

            </div>
            <Footer></Footer>
        </div>
    );
};

export default Home;