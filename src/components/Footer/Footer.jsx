import logo from '../../assets/images/logo.jfif'

const Footer = () => {
    return (
        <div>
            <footer className="footer p-10 text-base-content">
                <aside>
                    <img src={logo} alt="" className='h-28 w-28 rounded-lg' />
                    <p className='text-xl'>Soft Blog Arena <br /> <span className='italic text-sm'>Explore Yourself, Share with others</span></p>
                </aside>
                <nav>
                    <header className="footer-title">Services</header>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <header className="footer-title">Company</header>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <header className="footer-title">Legal</header>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
                
            </footer>
            <aside className='text-center bg-black text-white p-1'>
                    <p>Copyright © 2023 - All right reserved by Soft Blog Developer Team</p>
                </aside>
        </div>
    );
};

export default Footer;