import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from "react-icons/ai";
import { useContext, useState } from 'react';
import { AuthContext } from '../../components/Provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogSection = ({ blog }) => {
    const { _id, title, authorImg, category, postAdminMail, image, shortDescription, date } = blog;

    const { user } = useContext(AuthContext);
    const currentEmail = user?.email;
    const [wishList, setWishList] = useState(false);

    const handleWishList = (wishList) => {
        setWishList(wishList);
        if (wishList) {
            const newWishList = { title, authorImg, category, postAdminMail, image, shortDescription, date, currentEmail: currentEmail };
            console.log(newWishList);
            fetch('http://localhost:5000/addWishList', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newWishList)
            })
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        toast.success('Added to WishList Successfully', {
                            position: toast.POSITION.TOP_CENTER, autoClose: 1500,
                        });
                    }
                    else {
                        toast.error('Already Added to WishList', {
                            position: toast.POSITION.TOP_CENTER, autoClose: 1500,
                        });
                    }
                })
        }
    }
    return (
        <div className='space-y-2 pt-6'>
            <img src={image} alt="" className='md:h-[500px] h-[350px] w-full rounded-lg' />
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
                        <AiOutlineHeart className={wishList ? 'selected text-2xl' : 'text-2xl'} onClick={() => handleWishList(true)}></AiOutlineHeart>
                        :
                        <Link to='/login'><AiOutlineHeart className="text-2xl" ></AiOutlineHeart></Link>
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

BlogSection.propTypes = {
    blog: PropTypes.object.isRequired
}

export default BlogSection;