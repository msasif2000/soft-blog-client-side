import { useLoaderData } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useContext, useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsSend } from "react-icons/bs";
import { AuthContext } from "../../components/Provider/AuthProvider";
import { toast } from "react-toastify";


const BlogDetails = () => {
    const blog = useLoaderData();
    const { _id, title, category, authorImg, postAdminMail, image, shortDescription, date, details } = blog;
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

    return (
        <div className="md:container mx-auto">
            <div className=" md:flex ">
                <div className="lg:w-1/5 md:w-2/6">
                    <Navbar></Navbar>
                </div>
                <div className="p-2 gap-4 lg:w-4/6 mx-auto md:w-5/6">
                    <div className='space-y-2'>
                        <img src={image} alt="" className='lg:h-[470px] md:h-[320px] h-[250px]  w-full rounded-lg' />
                        <div className='md:flex  px-2 items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <img src={authorImg} alt="" className="h-12 w-12 rounded-full bg-sky-300 border-2" />
                                <p>Author: <span className='text-blue-600'>{postAdminMail}</span></p>
                            </div>
                            <p className="md:pt-0 pt-2">Date: {date}</p>
                        </div>
                        <div className='px-2 space-y-2'>
                            <p className='text-2xl font-bold'>Title: {title}</p>
                            <p className="font-bold">Category: <span className='italic font-semibold'>{category}</span></p>
                            <p>###{shortDescription}###</p>
                        </div>
                        <div className="border-2 border-orange-600 p-4">
                            <p>{details}</p>
                        </div>
                        <div className="md:flex justify-between items-center pb-4">
                            <div className='flex justify-between items-center'>
                                {

                                    isInWishList ? (
                                        <AiFillHeart className="text-3xl" onClick={() => handleWishList(false)} />
                                    ) : (
                                        <AiOutlineHeart className="text-3xl" onClick={() => handleWishList(true)} />
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
                                                'You cannot comment on your own post'
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
                        </div>
                        <div>
                            {
                                comments?.map(comment => <div className="border-2 border-orange-100 p-4" key={comment._id}>
                                    <div className="flex items-center gap-2">
                                        <img src={comment.commentAuthorImg} alt="" className="h-12 w-12 rounded-full bg-sky-300 border-2" />
                                        <p>{comment.commentAuthorMail}</p>
                                    </div>
                                    <p className="pl-12">{comment.comment}</p>
                                </div>)
                            }
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default BlogDetails;