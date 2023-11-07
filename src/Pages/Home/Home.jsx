import { Link } from "react-router-dom";
import Banner from "../../components/Banner/Banner";
import Header from "../../components/Header/Header";
import HomeBlog from "../../components/HomeBlog/HomeBlog";
import Social from "../../components/Social/Social";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import NewsLetter from "../../components/NewsLetter/NewsLetter";

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
            <div className="md:flex gap-6">
                <div className="lg:w-2/6 md:w-2/5">
                    <div className="flex md:flex-col flex-row-reverse">
                        <div>
                            <h2 className="text-2xl ml-2 md:p-4"><span className="text-orange-800 font-bold px-1 border-b-0 shadow-2xl">Explore Yourself</span>, <br /> <span className=" text-orange-600 font-bold shadow-2xl  px-1">Share with others</span></h2>
                        </div>
                        <Navbar></Navbar>
                    </div>
                    <div className=" mt-48">
                        <div className="lg:p-2 lg:mt-2 lg:flex hidden">
                            <NewsLetter></NewsLetter>
                        </div>
                        <div className="p-2 lg:mt-2 md:flex hidden">
                            <Social></Social>
                        </div>

                    </div>
                </div>
                <div className="flex flex-col  items-center justify-center px-2">
                    <div>
                        <Banner></Banner>
                    </div>

                    <h2 className="text-2xl font-bold text-center mt-12 bg-orange-600 p-2 text-white rounded">Recent Blogs</h2>
                    <div>
                        {
                            blogs.map(blog => <HomeBlog key={blog._id} blog={blog}></HomeBlog>)
                        }
                    </div>
                    <div className="pt-4">
                        <Link to='/allBlogs'><button className="btn btn-sm bg-orange-600 text-white">See More Blog...</button></Link>
                    </div>
                    <div className="lg:hidden mt-8 flex  w-full">
                            <NewsLetter></NewsLetter>
                        </div>
                </div>


            </div>
        </div>
    );
};

export default Home;