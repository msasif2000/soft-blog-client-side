import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/Provider/AuthProvider";
import Header from "../../components/Header/Header";
import { Link, useNavigate } from "react-router-dom";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import { AiTwotoneEdit, AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import Social from "../../components/Social/Social";

const Profile = () => {
    const { user } = useContext(AuthContext);

    const [blogPosts, setBlogPosts] = useState([]);

    useEffect(() => {
        fetch(`https://soft-blog-server.vercel.app/profile/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setBlogPosts(data);
            })
    }, [user?.email])

    const email = user?.email;
    const name = user?.displayName;
    // const photoURL = user?.photoURL? user.photoURL : "https://i.ibb.co/NVLwTNM/manager.jpg";

   // const location = useLocation();
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
                fetch(`https://soft-blog-server.vercel.app/blogs/${_id}`, {
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

                            navigate( '/profile');
                        }
                    })

            }
        })
    }
    return (
        <div className="md:container mx-auto mt-2">
            <Header></Header>

            <div className="md:flex gap-2">
                <div className=" lg:w-2/5 md:w-2/6">
                    <h2 className="text-3xl font-bold">DashBoard</h2>
                    <div className="">
                        <ul className="py-2 my-4 sty">
                            <li>Name: {name}</li>
                            <li className="text-blue-600">Email: {email}</li>
                            <li>Total Blog Post: {blogPosts.length}</li>
                        </ul>
                        <ul className="flex md:flex-col flex-wrap gap-4">
                            <li><Link to='/wishLists' className="font-bold  px-2 btn btn-sm bg-orange-600 text-white lg:w-1/2">My WishList</Link></li>
                            <li><Link to='/createBlog' className="font-bold px-2 btn btn-sm bg-orange-600 text-white  lg:w-1/2">Create Post</Link></li>
                            <li><Link to='/' ><span className="font-bold  px-2 btn btn-sm bg-orange-600 text-white  lg:w-1/2">Home</span></Link></li>
                            <li><Link to='/updateProfile' ><span className="font-bold  px-2 btn btn-sm bg-orange-600 text-white  lg:w-1/2">Update Profile</span></Link></li>
                        </ul>
                    </div>
                    <div className="md:flex mt-4 hidden pl-4">
                        <Social></Social>
                    </div>
                    <div className="lg:p-4 lg:mt-2 lg:flex hidden w-6/8 pl-4">
                        <NewsLetter></NewsLetter>
                    </div>

                </div>
                <div className=" lg:w-4/6 mx-auto md:w-5/6">
                    <h2 className="text-2xl font-bold text-center">My Posts</h2>
                    {
                        blogPosts.map(blog => <div className=" p-2 mb-2" key={blog._id}>
                            <img src={blog.image} alt="" className='lg:h-[450px] md:h-[300px] h-[250px] w-full rounded-lg' />

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
                    <div className="md:hidden flex">
                        <Social></Social>
                    </div>
                    <div className="md:flex lg:hidden justify-center mt-8">
                        <NewsLetter></NewsLetter>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Profile;