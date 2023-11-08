import Marquee from 'react-fast-marquee';
import bn3 from '../../assets/images/bn3.avif'
import bn4 from '../../assets/images/bn4.jpg'
import bn5 from '../../assets/images/bn5.jpg'

const Banner = () => {
    return (
             <Marquee className='shadow-2xl shadow-orange-600'>
                <div className="carousel-item md:h-96 h-72">
                    <img src="https://i.ibb.co/W37RFzZ/bn1.webp"/>
                </div>
                <div className="carousel-item md:h-96 h-72">
                    <img src={bn3}/>
                </div>
                <div className="carousel-item md:h-96 h-72">
                    <img src={bn4}/>
                </div>
                <div className="carousel-item md:h-96 h-72">
                    <img src={bn5}/>
                </div>
                <div className="carousel-item md:h-96 h-72">
                    <img src="https://i.ibb.co/7Rrdwrk/bn2.webp"/>
                </div>
            </Marquee>  
    );
};

export default Banner;