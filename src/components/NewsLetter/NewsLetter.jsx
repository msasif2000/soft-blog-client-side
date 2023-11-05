

const NewsLetter = () => {
    return (
        <div>
            <form>
                <header className="footer-title">Newsletter</header>
                <fieldset className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Enter your email address</span>
                    </label>
                    <div className="relative">
                        <input type="text" placeholder="Your email" className="input border-2 border-slate-100 w-full" />
                        <button className="btn bg-orange-700 text-white absolute top-0 right-0 rounded-l-none">Subscribe</button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
};

export default NewsLetter;