
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewsLetter = () => {
    const handleNewsLetter = e => {
        e.preventDefault();
        toast.success('You have successfully subscribed to our newsletter', {
            position: "top-center",
            autoClose: 2000,
        });
        e.target.reset();
    }
    return (
        <div>
            <form onSubmit={handleNewsLetter}>
                <header className="footer-title">Newsletter</header>
                <fieldset className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Enter your email address</span>
                    </label>
                    <div className="relative">
                        <input type="text" placeholder="Your email" className="input border-2 border-slate-100 w-full" required/>
                        <input type="submit" value='subscribe' className="btn bg-orange-600 text-white absolute top-0 right-0 rounded-l-none"/>
                    </div>
                </fieldset>
            </form>
            <ToastContainer />
        </div>
    );
};

export default NewsLetter;