import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const slides = [
    {
        image: 'https://images.unsplash.com/photo-1611262588019-db6cc2032da3?q=80&w=3200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        headline: 'Apple latest announcements promise groundbreaking innovations, including a revolutionary AR-AI device',
        description: 'Discover the latest and most exciting news about Apple. Stay updated with the innovations and developments in the world of technology.',
        category: 'Technology'
    },
    {
        image: 'https://images.unsplash.com/flagged/photo-1554386690-ddcab0b98d1d?q=80&w=3369&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        headline: 'Bitcoin Buzz: Unraveling the Cryptocurrency Revolution with Surging Prices, Mainstream Adoption, and Regulatory Developments',
        description: 'Catch up on the latest buzz and trends in the world of Bitcoin. Learn about price movements, market analysis, and the future of cryptocurrencies.',
        category: 'Finance'
    },
    {
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        headline: "Entertainment takes you on a profound journey into the world of entertainment, and at the forefront of this discussion is the modern music icon, Taylor Swift.",
        description: 'Explore the world of entertainment with captivating stories, celebrity updates, and the latest happenings in the entertainment industry.',
        category: 'Entertaiment'
    },
];


const Hero = () => {
    const slickSlider = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            slickSlider.current.slickNext();
        }, 3000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };


    return (
        <>
        <div className='relative'>
            <Slider {...settings} ref={slickSlider}>
                {slides.map((slide, index) => (
                    <div key={index} className="items-start justify-start relative">

                        <div
                            className="text-white p-8 text-start relative rounded-t-none rounded-b-2xl"
                            style={{
                                backgroundImage: `url(${slide.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                height: '75vh',
                                //   borderRadius: '20px',
                                position: 'relative',
                            }}
                        >

                            <div className="absolute top-0 left-0 w-screen h-full bg-black opacity-60 border border-gray-700 dark:border-gray-400 rounded-t-none rounded-b-2xl"></div>

                            <div className="mt-[150px] ml-20 relative z-10 w-1/2">
                                <p className="inline-block bg-gray-200 px-4 py-2 rounded-2xl shadow-md text-center font-bold text-black mb-5">
                                    {slide.category}
                                </p>
                                <h1 className="text-4xl font-bold mb-4">{slide.headline}</h1>
                                <p className="text-sm font-light mb-1">{slide.description}</p>
                                <hr className="mt-10" />
                            </div>

                        </div>
                    </div>
                ))}
            </Slider>
        </div>


        </>

    );
};

export default Hero;
