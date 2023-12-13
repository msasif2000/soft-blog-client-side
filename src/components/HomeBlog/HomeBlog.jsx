import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";

import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { BiBookmarkAltPlus } from "react-icons/bi";
import { FcComments } from "react-icons/fc";

import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../Provider/AuthProvider';
import { useContext, useEffect, useState } from 'react';
import { BsSend } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const HomeBlog = ({ blog }) => {
    const { _id, title, authorImg, category, postAdminMail, image, shortDescription, date, details } = blog;
    const { user } = useContext(AuthContext);
    const currentEmail = user?.email;
    const commentAuthorImg = user?.photoURL ? user.photoURL : "https://i.ibb.co/NVLwTNM/manager.jpg";

    const [isInWishList, setIsInWishList] = useState(false);
    const [wishListId, setWishListID] = useState(null);
    const [isInReaction, setIsInReaction] = useState(false);
    const [reactionId, setReactionID] = useState(null);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/reactions/${currentEmail}`)
                .then(res => res.json())
                .then(data => {
                    const existInReaction = data.find(
                        exist =>
                            exist.blogId === _id && exist.currentEmail === currentEmail
                    );
                    if (existInReaction) {
                        setIsInReaction(true);
                        setReactionID(existInReaction._id);
                    }

                })

        }
    }, [user, currentEmail, _id])

    const handleReaction = (addToReaction) => {
        if (!user) {
            toast.error('Please log in to react on a post.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
            return;
        }
        if (addToReaction) {
            if (isInReaction) {
                toast.error('Already Added to Reaction', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                });
            } else {
                const newReaction = { title, authorImg, blogId: _id, category, postAdminMail, image, shortDescription, date, currentEmail: currentEmail, details };

                fetch('http://localhost:5000/addReaction', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newReaction),
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data) {
                            setIsInReaction(true);
                            // console.log(data._id);
                            setReactionID(data.insertedId);
                        } else {
                            toast.error('Failed to add to Reaction', {
                                position: toast.POSITION.TOP_CENTER,
                                autoClose: 1500,
                            });
                        }
                    });
            }
        } else {
            if (isInReaction) {
                console.log(reactionId);
                fetch(`http://localhost:5000/reaction/${reactionId}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data) {
                            setIsInReaction(false);
                        } else {
                            toast.error('Failed to remove from Reaction', {
                                position: toast.POSITION.TOP_CENTER,
                                autoClose: 1500,
                            });
                        }
                    });
            }
        }
    };
    const [reactionCount, setReactionCount] = useState(0);
    useEffect(() => {
        fetch(`http://localhost:5000/reactions/${_id}`)
            .then(res => res.json())
            .then(data => {
                setReactionCount(data.length);
            }), [_id]
    })
    // const [reaction, setReaction] = useState(null);
    // useEffect(() => {
    //     fetch(`http://localhost:5000/reactions/${_id}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setReaction(data);
    //         }), [_id]
    // })

    const [comments, setComments] = useState(null);
    useEffect(() => {
        fetch(`https://soft-blog-server.vercel.app/comments/${_id}`)
            .then(res => res.json())
            .then(data => {
                setComments(data);
            })

    }, [_id])

    const cmmnt = comments?.length;
    useEffect(() => {
        if (user) {
            fetch(`https://soft-blog-server.vercel.app/wishLists/${currentEmail}`)
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

                fetch('https://soft-blog-server.vercel.app/addWishList', {
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
                fetch(`https://soft-blog-server.vercel.app/wishList/${wishListId}`, {
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
        fetch('https://soft-blog-server.vercel.app/addComment', {
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

    const { ref, inView } = useInView({
        triggerOnce: true,
    });


    return (
        <motion.div className='space-y-2  border mx-2 mt-8 rounded-lg' ref={ref}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
        >
            <PhotoProvider>
                <PhotoView src={image}>
                    <motion.img src={image} alt="" className='lg:h-[450px] md:h-[300px] h-[250px] w-full rounded-lg' key={image}
                        initial={{ y: 1200, opacity: 0 }}
                        animate={inView ? { y: 0, opacity: 1 } : {}}
                        exit={{ y: -800, opacity: 0 }}
                    />
                </PhotoView>
            </PhotoProvider>

            <div className='flex  px-2 items-center gap-2'>
                <img src={authorImg} alt="" className="h-12 w-12 rounded-full bg-sky-300 border-2" />
                <div className='lg:flex items-center gap-2 justify-between w-full'>

                    <p>Author: <span className='text-blue-600'>{postAdminMail}</span></p>
                    <p className=''>Date: {date}</p>
                </div>

            </div>
            <div className='px-2 space-y-2'>
                <p className='text-2xl font-bold'>Topic: {title}</p>
                <p>Category: <span className='italic font-semibold'>{category}</span></p>
                <p>###{shortDescription}###</p>
                <div className="md:flex justify-between items-center pb-4">
                    <div className='flex justify-between items-center gap-2'>
                        {
                            user ? (
                                isInWishList ? (
                                    <BsFillBookmarkCheckFill className="text-3xl" onClick={() => handleWishList(false)} />
                                ) : (
                                    <BiBookmarkAltPlus className="text-3xl" onClick={() => handleWishList(true)} />
                                )
                            ) : (
                                <Link to="/login">
                                    <BiBookmarkAltPlus className="text-3xl" />
                                </Link>
                            )
                        }
                        <div>
                            {
                                user ? (
                                    isInReaction ? (
                                        <div className="flex items-center justify-center gap-1">
                                            <FcLike className="text-3xl" onClick={() => handleReaction(false)} />
                                            <p className="text-xl">{reactionCount}</p>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center gap-1">
                                            <FcLikePlaceholder className="text-3xl" onClick={() => handleReaction(true)} />
                                            <p className="text-xl">{reactionCount}</p>
                                        </div>
                                    )
                                ) : (
                                    <Link to="/login">
                                        <FcLikePlaceholder className="text-3xl" />
                                    </Link>
                                )
                            }
                        </div>
                        <div className='md:hidden'>
                            {
                                cmmnt === 0 ?
                                    <p className="w-1/4 flex gap-1"><span><FcComments className="text-3xl" /></span></p>
                                    :
                                    <p className="w-1/4 flex gap-1"><FcComments className="text-3xl" /><span>{cmmnt} </span></p>
                            }
                        </div>
                    </div>
                    <div className=' flex items-center gap-4 w-full md:mx-4 '>
                        <div className='md:flex hidden'>
                            {
                                cmmnt === 0 ?
                                    <p className="w-1/4 flex gap-1"> <span> <FcComments className="text-3xl" /></span></p>
                                    :
                                    <p className="w-1/4 flex gap-1"><span> <FcComments className="text-3xl" /></span><span>{cmmnt} </span> </p>
                            }
                        </div>
                        <div className='w-full'>
                            {
                                user ?
                                    user?.email === postAdminMail ?
                                        <div className='lg:flex gap-2 items-center'>
                                            <p className='text-red-600'>You cannot comment on your own post</p>

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
        </motion.div>
    );
};


HomeBlog.propTypes = {
    blog: PropTypes.object.isRequired
}
export default HomeBlog;