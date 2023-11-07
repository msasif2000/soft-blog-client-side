import bn3 from '../../assets/images/bn3.avif'
import bn4 from '../../assets/images/bn4.jpg'
import bn5 from '../../assets/images/bn5.jpg'

const Banner = () => {
    return (
        <div>
            <div className="md:h-96 h-72 carousel carousel-vertical">
                <div className="carousel-item h-full">
                    <img src="https://i.ibb.co/W37RFzZ/bn1.webp" className='w-full'/>
                </div>
                <div className="carousel-item h-full">
                    <img src={bn3} className='w-full'/>
                </div>
                <div className="carousel-item h-full">
                    <img src={bn4} className='w-full'/>
                </div>
                <div className="carousel-item h-full">
                    <img src={bn5} className='w-full'/>
                </div>
                <div className="carousel-item h-full">
                    <img src="https://i.ibb.co/7Rrdwrk/bn2.webp" className='w-full'/>
                </div>

            </div>
        </div>
    );
};

export default Banner;