import { useContext } from "react";
import { AuthContext } from "../../components/Provider/AuthProvider";
import Header from "../../components/Header/Header";
import { Link, useLoaderData } from "react-router-dom";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import Footer from "../../components/Footer/Footer";


const Profile = () => {
    const { user } = useContext(AuthContext);

    const blogPosts = useLoaderData();
    console.log(blogPosts);

    const email = user?.email;
    const name = user?.displayName;
    // const photoURL = user?.photoURL? user.photoURL : "https://i.ibb.co/NVLwTNM/manager.jpg";

    return (
        <div className="md:container mx-auto mt-2">
            <Header></Header>
            <h2 className="text-3xl font-bold">DashBoard</h2>
            <div className="flex gap-2">
                <div className="pl-4  lg:w-1/5 md:w-2/6">
                    <ul className="sty">
                        <div className="border border-orange-600 p-2 my-4">
                            <li>Name: {name}</li>
                            <li className="text-blue-600">Email: {email}</li>
                            <li>Total Blog Post: {blogPosts.length}</li>
                        </div>
                        <li><Link to={`/wishLists/${email}`} className="font-bold">My WishList</Link></li>
                        <li><Link to='/createBlog' className="font-bold">Create a Blog Post</Link></li>

                        <li><Link to='/' ><span className="text-orange-600 font-bold">{'<Back to Home'}</span></Link></li>
                    </ul>
                    <div className="my-12">
                        <NewsLetter></NewsLetter>
                    </div>
                </div>
                <div className=" lg:w-4/5 md:w-5/6">
                    {
                        blogPosts.map(blog => <div className=" p-2 mb-2" key={blog._id}>
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
                                <div className='flex '>
                                    <div className='flex justify-end pr-4'>
                                        <Link to={`/allBlogs/${blog._id}`}><button className='btn btn-sm italic text-orange-600'> See Details...</button></Link>
                                    </div>

                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Profile;