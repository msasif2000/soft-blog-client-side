import { Link, useLoaderData } from "react-router-dom";
import Navbar from "../Navbar/Navbar";


const FeaturedBlogs = () => {
    const featuredBlogs = useLoaderData();
    //console.log(featuredBlogs);
    return (
        <div>
            <div className="md:flex">
                <div className="lg:w-1/5 md:w-2/6">
                    <Navbar></Navbar>
                </div>
                <div className="p-2 gap-4 lg:w-4/5 md:w-5/6">
                    <h2 className="text-2xl font-bold text-center">Featured Blogs</h2>
                    {
                        featuredBlogs?.map(blog => <div className=" p-2 mb-2" key={blog._id}>
                            <img src={blog.image} alt="" className='md:h-[500px] h-[350px] w-full rounded-lg' />

                            <div className='flex  px-2 items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                </div>
                                <p>Date: {blog.date}</p>
                            </div>
                            <div className='px-2 space-y-2'>
                                <p className='text-2xl font-bold'>Topic: {blog.title}</p>
                                <p>Category: <span className='italic font-semibold'>{blog.category}</span></p>
                                <p>###{blog.shortDescription}###</p>
                                <div className='flex justify-between'>
                                    <div className='flex justify-end pr-4'>
                                        <Link to={`/allBlogs/${blog._id}`}><button className='btn btn-sm italic text-orange-600'> See Details...</button></Link>
                                    </div>

                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default FeaturedBlogs;