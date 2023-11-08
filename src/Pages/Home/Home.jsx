import { Link } from "react-router-dom";
import Banner from "../../components/Banner/Banner";
import Header from "../../components/Header/Header";
import HomeBlog from "../../components/HomeBlog/HomeBlog";
import Social from "../../components/Social/Social";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import { AnimatePresence } from "framer-motion";


const Home = () => {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        fetch('https://soft-blog-server.vercel.app/allBlogs')
            .then(res => res.json())
            .then(data =>
                setBlogs(data.slice(0, 6)))
    }, [])
    //console.log(blogs);
    return (
        <div>
            <Header></Header>
            <div className="md:flex lg:gap-6">
                <div className="lg:w-2/6 md:w-2/5">
                    <div className="flex md:flex-col flex-row-reverse w-3/4">
                        <div className="">
                            <h2 className="text-2xl lg:ml-2 lg:px-4"><p className="text-orange-800 font-bold px-1 shadow-2xl shadow-orange-400 flex"><span>Explore</span> <span>Yourself,</span></p> <br /> <span className=" text-orange-600 font-bold shadow-2xl  shadow-orange-600  px-1 py-1">Teach others</span></h2>
                        </div>
                        <Navbar></Navbar>
                    </div>
                    <div className=" md:mt-48">
                        <div className="p-2 lg:mt-2 md:flex hidden">
                            <Social></Social>
                        </div>
                        <div className="lg:p-2 lg:mt-2 lg:flex hidden">
                            <NewsLetter></NewsLetter>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col  items-center justify-center md:px-2 gap-4 lg:w-4/6 md:w-5/6 mx-auto">
                    <div className="w-full md:mt-4 mt-40">
                        <Banner></Banner>
                    </div>

                    <h2 className="text-2xl font-bold text-center mt-12 bg-orange-600 p-2 text-white rounded">Recent Blogs</h2>
                    <div>
                    <AnimatePresence>
                            {
                                blogs.map(blog => <HomeBlog key={blog._id} blog={blog}></HomeBlog>)
                            }
                        
                    </AnimatePresence>
                    </div>
                    <div className="pt-4">
                        <Link to='/allBlogs'><button className="btn btn-sm bg-orange-600 text-white">See More Blog...</button></Link>
                    </div>
                    <div className="md:hidden mt-8 flex  w-full">
                        <Social></Social>
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