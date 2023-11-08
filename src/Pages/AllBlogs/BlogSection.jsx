import { PropTypes } from 'prop-types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiFillHeart, AiOutlineDelete, AiOutlineHeart, AiTwotoneEdit } from 'react-icons/ai';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../components/Provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsSend } from "react-icons/bs";
import Swal from 'sweetalert2';

const BlogSection = ({ blog }) => {
    const { _id, title, authorImg, category, postAdminMail, image, shortDescription, date, details } = blog;

    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const currentEmail = user?.email;
    const commentAuthorImg = user?.photoURL ? user.photoURL : "https://i.ibb.co/NVLwTNM/manager.jpg";
    const [isInWishList, setIsInWishList] = useState(false);
    const [wishListId, setWishListID] = useState(null);

    const [comments, setComments] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:5000/comments/${_id}`)
            .then(res => res.json())
            .then(data => {
                setComments(data);
            })

    }, [_id])

    const cmmnt = comments?.length;

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/wishLists/${currentEmail}`)
                .then(res => res.json())
                .then(data => {
                    const existInWishList = data.find(
                        exist =>
                            exist.blogId === _id && exist.postAdminMail !== currentEmail
                    );
                    if (existInWishList) {
                        setIsInWishList(true);
                        setWishListID(existInWishList._id);
                    }
                });
        }
    }, [user, currentEmail, _id]);

    const handleWishList = (addToWishList) => {
        if (!user) {
            toast.error('Please log in to add to your wish list.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
            return;
        }

        if (addToWishList) {
            if (postAdminMail === currentEmail) {
                toast.error('You cannot add your own post to your wish list.', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                });
                return;
            }

            if (isInWishList) {
                toast.error('Already Added to Wish List', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                });
            } else {
                const newWishList = { title, authorImg, blogId: _id, category, postAdminMail, image, shortDescription, date, currentEmail: currentEmail, details };

                fetch('http://localhost:5000/addWishList', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newWishList),
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data) {
                            toast.success('Added to Wish List Successfully', {
                                position: toast.POSITION.TOP_CENTER,
                                autoClose: 1500,
                            });
                            setIsInWishList(true);
                            setWishListID(data._id);
                        } else {
                            toast.error('Failed to add to Wish List', {
                                position: toast.POSITION.TOP_CENTER,
                                autoClose: 1500,
                            });
                        }
                    });
            }
        } else {
            if (isInWishList) {
                fetch(`http://localhost:5000/wishList/${wishListId}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data) {
                            toast.success('Removed from Wish List', {
                                position: toast.POSITION.TOP_CENTER,
                                autoClose: 1500,
                            });
                            setIsInWishList(false);
                        } else {
                            toast.error('Failed to remove from Wish List', {
                                position: toast.POSITION.TOP_CENTER,
                                autoClose: 1500,
                            });
                        }
                    });
            }
        }
    };


    const handleComment = (e) => {
        e.preventDefault();
        const form = e.target;
        const comment = form.title.value;
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        });
        const newComment = { comment, date: formattedDate, blogId: _id, postAdminMail, commentAuthorMail: currentEmail, commentAuthorImg: commentAuthorImg };
        fetch('http://localhost:5000/addComment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newComment),
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    toast.success('Commented Successfully', {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 1500,
                    });
                    form.reset();
                } else {
                    toast.error('Failed to comment', {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 1500,
                    });
                }
            });
    }


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

                            navigate(location.state?.from ? location.state.from : '/allBlogs');
                        }
                    })

            }
        })
    }

    return (
        <div className="space-y-2 pt-6 border-b-black border-b-2">
            <img src={image} alt="" className="lg:h-[450px] md:h-[350px] h-[250px] w-full rounded-lg" />
            <div className='flex  px-2 items-center gap-2'>
                <img src={authorImg} alt="" className="h-12 w-12 rounded-full bg-sky-300 border-2" />
                <div className='lg:flex items-center gap-2 justify-between w-full'>

                    <p>Author: <span className='text-blue-600'>{postAdminMail}</span></p>
                    <p className=''>Date: {date}</p>
                </div>

            </div>
            <div className="px-2 space-y-2">
                <p className="text-2xl font-bold">Topic: {title}</p>
                <p>Category: <span className="italic font-semibold">{category}</span></p>
                <p>###{shortDescription}###</p>
                <div className="md:flex justify-between items-center pb-4">
                    <div className='flex justify-between items-center'>
                        {
                            user ? (
                                isInWishList ? (
                                    <AiFillHeart className="text-3xl" onClick={() => handleWishList(false)} />
                                ) : (
                                    <AiOutlineHeart className="text-3xl" onClick={() => handleWishList(true)} />
                                )
                            ) : (
                                <Link to="/login">
                                    <AiOutlineHeart className="text-3xl"></AiOutlineHeart>
                                </Link>
                            )
                        }
                        <div className='md:hidden'>
                            {
                                cmmnt === 0 ?
                                    <p className="w-1/4 flex gap-1"><span>No </span> <span> Comments</span></p>
                                    :
                                    <p className="w-1/4 flex gap-1"><span>{cmmnt} </span> <span> Comments</span></p>
                            }
                        </div>
                    </div>
                    <div className=' flex items-center gap-4 w-full md:mx-4 '>
                        <div className='md:flex hidden'>
                            {
                                cmmnt === 0 ?
                                    <p className="w-1/4 flex gap-1"><span>No </span> <span> Comments</span></p>
                                    :
                                    <p className="w-1/4 flex gap-1"><span>{cmmnt} </span> <span> Comments</span></p>
                            }
                        </div>
                        <div className='w-full'>
                            {
                                user ?
                                    user?.email === postAdminMail ?
                                        <div className='lg:flex gap-2 items-center'>
                                            <p>You cannot comment on your own post</p>
                                            <div className="flex gap-6 pr-1">
                                                <Link to={`/updateBlog/${blog._id}`}><button className="bg-green-600 p-2 rounded"><AiTwotoneEdit className='text-white'></AiTwotoneEdit></button></Link>
                                                <button onClick={() => handleDeletePost(_id)} className="bg-red-500 p-2 rounded"><AiOutlineDelete className='text-white'></AiOutlineDelete></button>
                                            </div>
                                        </div>

                                        :
                                        <form onSubmit={handleComment}>
                                            <div className="flex items-center">
                                                <input required type="text" name="title" placeholder="Write a comment..." className="input input-bordered rounded-3xl w-full" />
                                                <button type="submit" className="bg-orange-600 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded-full ml-2">
                                                    <BsSend className="text-xl" />
                                                </button>
                                            </div>
                                        </form>
                                    :
                                    'You need to login to comment'
                            }
                        </div>
                    </div>
                    <div className="md:flex justify-end w-44 md:mt-0 mt-2">
                        {
                            user ?
                                <Link to={`/allBlogs/${_id}`}><button className="btn btn-sm italic text-orange-600">See Details...</button> </Link>
                                :
                                <Link to="/login"><button className="btn btn-sm italic text-orange-600">See Details...</button> </Link>
                        }
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

BlogSection.propTypes = {
    blog: PropTypes.object.isRequired,
};

export default BlogSection;
