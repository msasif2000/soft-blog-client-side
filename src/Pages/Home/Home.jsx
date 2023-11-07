import { Link } from "react-router-dom";
import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
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
            <div className="flex gap-6">
                <div className="w-2/6">
                    <div>
                        <h2 className="text-2xl ml-2 p-4"><span className="text-orange-800 font-bold border-orange-600 border px-1 border-b-0">Explore Yourself</span>, <br /> <span className=" text-orange-600 font-bold border-orange-800 border px-1">Share with others</span></h2>
                        <Navbar></Navbar>
                    </div>
                    <div className="px-8 mt-48">
                        <div className="p-2 mt-2">
                            <NewsLetter></NewsLetter>
                        </div>
                        <div className="p-2 mt-2">
                            <Social></Social>
                        </div>

                    </div>
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


            </div>
            <Footer></Footer>
        </div>
    );
};

export default Home;