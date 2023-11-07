
import { PropTypes } from 'prop-types';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../Provider/AuthProvider';
import { useContext, useEffect, useState } from 'react';

const HomeBlog = ({ blog }) => {
    const { _id, title, authorImg, category, postAdminMail, image, shortDescription, date, details } = blog;

    const { user } = useContext(AuthContext);
    const currentEmail = user?.email;
    const [isInWishList, setIsInWishList] = useState(false);
    const [wishListId, setWishListID] = useState(null);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/wishLists/${currentEmail}`)
                .then(res => res.json())
                .then(data => {
                    const existInWishList = data.find(exist => exist.blogId === _id);
                    if (existInWishList) {
                        setIsInWishList(true);
                        setWishListID(existInWishList._id);
                    }
                })
        }
    }, [user, currentEmail, _id])
    //console.log(wishListId);
    const handleWishList = (addToWishList) => {
        if (!user) {
            toast.error('Please log in to add to your wish list.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
            return;
        }
        if (addToWishList) {
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
                    .then((res) => res.json())
                    .then((data) => {
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
                    .then((res) => res.json())
                    .then((data) => {
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
    }
    return (
        <div className='space-y-2 pt-6'>
            <img src={image} alt="" className='lg:h-[500px] h-[350px] w-full rounded-lg' />
            <div className='flex  px-2 items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <img src={authorImg} alt="" className="h-12 w-12 rounded-full bg-sky-300 border-2" />
                    <p>Author: <span className='text-blue-600'>{postAdminMail}</span></p>
                </div>
                <p>Date: {date}</p>
            </div>
            <div className='px-2 space-y-2'>
                <p className='text-2xl font-bold'>Topic: {title}</p>
                <p>Category: <span className='italic font-semibold'>{category}</span></p>
                <p>###{shortDescription}###</p>
                <div className='flex justify-between'>
                    {
                        user ?
                            (
                                isInWishList ? (
                                    <AiFillHeart className='text-2xl' onClick={() => handleWishList(false)} />
                                ) : (
                                    <AiOutlineHeart className='text-2xl' onClick={() => handleWishList(true)} />
                                )
                            ) : (
                                <Link to='/login'><AiOutlineHeart className="text-2xl" ></AiOutlineHeart></Link>
                            )
                    }
                    <div className='flex justify-end pr-4'>
                        {
                            user ?
                                <Link to={`/allBlogs/${_id}`}><button className='btn btn-sm italic text-orange-600'> See Details...</button></Link>
                                :
                                <Link to='/login'><button className='btn btn-sm italic text-orange-600'> See Details...</button></Link>
                        }
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};


HomeBlog.propTypes = {
    blog: PropTypes.object.isRequired
}
export default HomeBlog;