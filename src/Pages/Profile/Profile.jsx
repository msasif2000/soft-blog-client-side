import { useContext } from "react";
import { AuthContext } from "../../components/Provider/AuthProvider";
import Header from "../../components/Header/Header";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import Footer from "../../components/Footer/Footer";
import { AiTwotoneEdit, AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import './Profile.css'

const Profile = () => {
    const { user } = useContext(AuthContext);

    const blogPosts = useLoaderData();
    //console.log(blogPosts);

    const email = user?.email;
    const name = user?.displayName;
    // const photoURL = user?.photoURL? user.photoURL : "https://i.ibb.co/NVLwTNM/manager.jpg";

    const location = useLocation();
    const navigate = useNavigate();
    const handleDeletePost = (_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete Post!'
        }).then((result) => {
            if (result.isConfirmed) {
        fetch(`http://localhost:5000/blogs/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    Swal.fire(
                        'Deleted!',
                        'The BlogPost has been deleted.',
                        'success'
                    )

                     navigate(location.state?.from ? location.state.from : `/profile/${email}`);
                }
            })
      
    }
})
    }
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
                    <h2 className="text-2xl font-bold text-center">My Posts</h2>
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
                                <div className='flex justify-between'>
                                    <div className='flex justify-end pr-4'>
                                        <Link to={`/allBlogs/${blog._id}`}><button className='btn btn-sm italic text-orange-600'> See Details...</button></Link>
                                    </div>
                                    <div className="flex gap-6 pr-2">
                                        <Link to={`/updateBlog/${blog._id}`}><button className="bg-green-600 p-2 rounded"><AiTwotoneEdit className='text-white'></AiTwotoneEdit></button></Link>
                                        <button onClick={() => handleDeletePost(blog._id)} className="bg-red-500 p-2 rounded"><AiOutlineDelete className='text-white'></AiOutlineDelete></button>
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