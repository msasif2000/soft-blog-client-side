import { PropTypes } from 'prop-types';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { AuthContext } from '../../components/Provider/AuthProvider';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const WishListPage = ({ blog }) => {
    // console.log(blog);
    const { _id, title, blogId, authorImg, category, postAdminMail, image, shortDescription, date } = blog;

    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [wishList, setBlog] = useState([]);
    useEffect(() => {
        fetch(`https://soft-blog-server.vercel.app/wishLists/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setBlog(data);
            })
    }, [user?.email])
    const handleDeleteFromWishList = (_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://soft-blog-server.vercel.app/wishList/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        //console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'The blog is remove from your WishList.',
                                'success'
                            )   
                            const remainingWishList = wishList.filter(blog => blog._id !== _id);
                            setBlog(remainingWishList);
                            navigate(location.state?.from ? location.state.from : '/profile');

                        }
                    })
            }
        })
    }
    const { ref, inView } = useInView({
        triggerOnce: true, 
    });
    return (
        <motion.div className="space-y-2 pt-6 border-b-black border-b-2 " ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}>
            <motion.img src={image} alt="" className="lg:h-[450px] md:h-[350px] h-[250px] w-full rounded-lg" 
                initial={{ y: 1200, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                exit={{ y: -800, opacity: 0 }}
                 />
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
                <div className='flex '>
                    <div className='flex justify-end pr-4'>
                        <Link to={`/allBlogs/${blogId}`}><button className='btn btn-sm italic text-orange-600'> See Details...</button></Link>
                    </div>
                    <div>
                        <button onClick={() => handleDeleteFromWishList(_id)} className='btn btn-sm bg-red-500 text-white'>Remove from WishList</button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

WishListPage.propTypes = {
    blog: PropTypes.object.isRequired,
};
export default WishListPage;