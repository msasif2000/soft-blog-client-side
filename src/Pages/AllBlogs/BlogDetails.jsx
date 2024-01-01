import { BiBookmarkAltPlus } from "react-icons/bi";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { FcComments, FcLike, FcLikePlaceholder } from "react-icons/fc";
import { Link, useLoaderData } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useContext, useEffect, useState } from "react";
import { BsSend } from "react-icons/bs";
import { AuthContext } from "../../components/Provider/AuthProvider";
import { toast } from "react-toastify";


const BlogDetails = () => {
    const blog = useLoaderData();
    const { _id, title, category, authorImg, postAdminMail, image, shortDescription, date, details } = blog;
    const createMarkup = () => {
        return { __html: details };
      };
    
    const { user } = useContext(AuthContext);
    const currentEmail = user?.email;
    const commentAuthorImg = user?.photoURL ? user.photoURL : "https://i.ibb.co/NVLwTNM/manager.jpg";
    const [isInWishList, setIsInWishList] = useState(false);
    const [wishListId, setWishListID] = useState(null);
    const [isInReaction, setIsInReaction] = useState(false);
    const [reactionId, setReactionID] = useState(null);

    const [reactionCount, setReactionCount] = useState(0);

    useEffect(() => {
        fetch(`https://soft-blog-server.vercel.app/reactions/${_id}`)
            .then(res => res.json())
            .then(data => {
                setReactionCount(data.length);
            }), [_id]
    })
    useEffect(() => {
        const fetchReactions = async () => {
            try {
                const response = await fetch(`https://soft-blog-server.vercel.app/reactionsState/${currentEmail}`);
                const data = await response.json();
                //console.log(data);
                const existInReaction = data.find(
                    (exist) => exist.blogId === _id && exist.currentEmail === currentEmail
                );

                //console.log(existInReaction);
                if (existInReaction) {
                    //console.log('1');
                    setIsInReaction(true);
                    setReactionID(existInReaction._id);
                }
            } catch (error) {
                console.error('Error fetching reactions:', error);
            }
        };

        if (user) {
            fetchReactions();
        }
    }, [user, currentEmail, _id]);

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

                fetch('https://soft-blog-server.vercel.app/addReaction', {
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
                fetch(`https://soft-blog-server.vercel.app/reaction/${reactionId}`, {
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

                    const newComments = [...comments, data];
                    setComments(newComments);

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
                            <div dangerouslySetInnerHTML={createMarkup()} />
                        </div>
                        <div className="md:flex justify-between items-center pb-4">
                            <div className='flex justify-between items-center gap-2'>
                                {

                                    isInWishList ? (
                                        <BsFillBookmarkCheckFill className="text-3xl" onClick={() => handleWishList(false)} />
                                    ) : (
                                        <BiBookmarkAltPlus className="text-3xl" onClick={() => handleWishList(true)} />
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
                                            <p className="w-1/4 flex gap-1"><span><FcComments className="text-3xl" /></span><span>{cmmnt} </span></p>
                                    }
                                </div>
                            </div>
                            <div className=' flex items-center gap-4 w-full md:mx-4 '>
                                <div className='md:flex hidden'>
                                    {
                                        cmmnt === 0 ?
                                            <p className="w-1/4 flex gap-1"><span><FcComments className="text-3xl" /></span></p>
                                            :
                                            <p className="w-1/4 flex gap-1"><span><FcComments className="text-3xl" /></span><span>{cmmnt} </span></p>
                                    }
                                </div>
                                <div className='w-full'>
                                    {
                                        user ?
                                            user?.email === postAdminMail ?
                                                <p className='text-red-600'>You cannot comment on your own post</p>
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