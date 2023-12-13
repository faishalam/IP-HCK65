const containerStyle = {
    backgroundImage: "url('https://res.cloudinary.com/de2dlumua/image/upload/v1702139425/gncwyyoh6oledbcrfitc.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    height: '65vh',
    // margin: '20px',
    borderRadius: "20px"
};



const Hero = () => {
    return (

        <div className="bg-black items-center justify-center" style={containerStyle}>
            <div className="text-white p-8 text-center">
                <div className="mt-[150px]">
                    <h1 className="text-4xl font-bold mb-4">Welcome to Lodge</h1>
                    <p className="text-lg mb-1">Discover Your Perfect Lodging</p>
                    <p className="text-lg mt-1">Find tranquility amidst nature with accommodations offering spectacular views and easy access to natural wonders.</p>

                </div>
                <div className="items-center justify-center pl-2 ml-auto mr-8 lg:flex lg:ml-0 lg:mr-0 mt-10">
                    <div className="flex px-6 py-2 border border-gray-700 rounded-full dark:border-gray-400 bg-transparent">
                        <input
                            type="text"
                            className="w-full pr-4 text-sm text-white-700 bg-transparent"
                            placeholder="search..."
                            style={{ width: 500 }}
                        />
                        <button className="flex items-center text-gray-700 dark:text-gray-400 dark:hover:text-grey-500 hover:text-white-700">
                            <span className="mr-1 ml-2">Go</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="currentColor"
                                className="bi bi-arrow-right"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;




// import React, { useEffect, useRef } from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';


// const slides = [
//     'https://www.e-spincorp.com/wp-content/uploads/2017/10/industry-media-entertainment.jpg',
//     'https://daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg',
//   ];

// const Hero = () => {
//   const slickSlider = useRef(null);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       slickSlider.current.slickNext();
//     }, 3000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 1000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//   };

//   return (
//     <Slider {...settings} ref={slickSlider}>
//       {slides.map((slide, index) => (
//         <div key={index} className="items-center justify-center">
//           <div className="text-white p-8 text-center" style={{backgroundImage : `url(${slide})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '65vh', borderRadius: '20px', backgroundAttachment: 'fixed', borderRadius: "20px", margin: '20px',}}>
//             <div className="mt-[150px]">
//               <h1 className="text-4xl font-bold mb-4">Welcome to Lodge</h1>
//               <p className="text-lg mb-1">Discover Your Perfect Lodging</p>
//               <p className="text-lg mt-1">Find tranquility amidst nature with accommodations offering spectacular views and easy access to natural wonders.</p>
//             </div>
//             <div className="items-center justify-center pl-2 ml-auto mr-8 lg:flex lg:ml-0 lg:mr-0 mt-10">
//               <div className="flex px-6 py-2 border border-gray-700 rounded-full dark:border-gray-400 bg-transparent">
//                 <input
//                   type="text"
//                   className="w-full pr-4 text-sm text-white-700 bg-transparent"
//                   placeholder="search..."
//                   style={{ width: 500 }}
//                 />
//                 <button className="flex items-center text-gray-700 dark:text-gray-400 dark:hover:text-grey-500 hover:text-white-700">
//                   <span className="mr-1 ml-2">Go</span>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width={16}
//                     height={16}
//                     fill="currentColor"
//                     className="bi bi-arrow-right"
//                     viewBox="0 0 16 16"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
//                     />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </Slider>
//   );
// };

// export default Hero;
