import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const ImageCarousel = ({ img1, img2, img3, img4, slideIndex, setSlideIndex }: any) => {
    useEffect(() => {
        const interval = setInterval(() => {
            showSlides();
        }, 2000);
        return () => clearInterval(interval);
    }, [slideIndex]);

    const showSlides = () => {
        const slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        setSlideIndex((prevIndex: any) => (prevIndex >= slides.length - 1 ? 0 : prevIndex + 1));
        slides[slideIndex].style.display = "block";
    };

    return <>
        <div className="slideshow-container">
            {(img1 && typeof img1 === 'string') && <div className="mySlides fade">
                {/* <div className="numbertext">1 / 3</div> */}
                <Image className="d-block w-100" src={img1} alt="Snow"
                    height={100} width={100}
                    loader={() => img1}
                    style={{ height: '100%', width: '100%' }}
                />
                {/* <div className="text">Caption Text</div> */}
            </div>}

            {(img2 && typeof img2 === 'string') && <div className="mySlides fade">
                {/* <div className="numbertext">2 / 3</div> */}
                <Image className="d-block w-100" src={img2} alt="Snow"
                    height={100} width={100}
                    loader={() => img2}
                    style={{ height: '100%', width: '100%' }}
                />
                {/* <div className="text">Caption Two</div> */}
            </div>}

            {(img3 && typeof img3 === 'string') && <div className="mySlides fade">
                {/* <div className="numbertext">3 / 3</div> */}
                <Image className="d-block w-100" src={img3} alt="Snow"
                    height={100} width={100}
                    loader={() => img3}
                    style={{ height: '100%', width: '100%' }}
                />
                {/* <div className="text">Caption Three</div> */}
            </div>}

            {(img4 && typeof img4 === 'string') && <div className="mySlides fade">
                {/* <div className="numbertext">3 / 3</div> */}
                <Image className="d-block w-100" src={img4} alt="Snow"
                    height={100} width={100}
                    loader={() => img4}
                    style={{ height: '100%', width: '100%' }}
                />
                {/* <div className="text">Caption Three</div> */}
            </div>}

        </div>
    </>
};

export default ImageCarousel;
