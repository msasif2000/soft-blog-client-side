import { Link } from "react-router-dom";
import error from '../../assets/images/error.jfif'

const ErrorPage = () => {
    return (
        <div className="flex flex-col justify-center mx-auto my-16">
            <div className="flex mx-auto">
                <img src={error} alt="" className="w-96 h-96" />
            </div>
            <div className="flex justify-center">
                <Link to='/'><button className="btn btn-sm bg-orange-600 text-white font-bold">{'< Home'}</button></Link>
            </div>
        </div>
    );
};

export default ErrorPage;