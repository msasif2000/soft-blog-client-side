import FeaturedBlogs from "../FeaturedBlogs/FeaturedBlogs";
import NewsLetter from "../NewsLetter/NewsLetter";
import Social from "../Social/Social";


const RightSide = () => {
    return (
        <div>
            <NewsLetter></NewsLetter>
            <div className="p-2 mt-2">
                <Social></Social>
            </div>
            <FeaturedBlogs></FeaturedBlogs>
        </div>
    );
};

export default RightSide;