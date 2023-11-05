import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

const BlogSection = ({ blog }) => {
    const { _id, title, user, category, postAdminMail, image, shortDescription, date } = blog;
    return (
        <div className='space-y-2 pt-6'>
            <img src={image} alt="" className='md:h-[500px] h-[350px] w-full rounded-lg' />
            <div className='flex  px-2 items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <img src={user} alt=""  className="h-12 w-12 rounded-full bg-sky-300 border-2" />
                    <p>Author: <span className='text-blue-600'>{postAdminMail}</span></p>
                </div>
                <p>Date: {date}</p>
            </div>
            <div className='px-2 space-y-2'>
                <p className='text-2xl font-bold'>Topic: {title}</p>
                <p>Category: <span className='italic font-semibold'>{category}</span></p>
                <p>{shortDescription}</p>
                <div className='flex justify-end pr-4'>
                    <Link to={`/allBlogs/${_id}`}><button className='btn btn-sm italic text-orange-600'> See Details...</button></Link>
                </div>
            </div>
        </div>
    );
};

BlogSection.propTypes = {
    blog: PropTypes.object.isRequired
}

export default BlogSection;