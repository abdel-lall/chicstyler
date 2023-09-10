"use client"


import { useState, useEffect } from "react";
import Image from 'next/image';
import Jumbotron from "../components/jumbotron/jumbotron.component";
import images from "@/utils/jumbotronImages";
import { motion } from "framer-motion";
import  RightArrow  from "../public/assets/images/right-arrow.svg";
import LeftArrow  from "../public/assets/images/left-arrow.svg";
import RadioButton from "../components/jumbotron/jumbo-radio-Button/radio.button.component";

import "@/styles/main.scss";

const Main = () => {

      
    
  const [currentImageNumber, setCurrentImageNumber] = useState(0);
  const [jumboWidth, setJumboWidth] = useState(0);
    const[mobileSize,setMobileSize] = useState(false)
  useEffect(() => {
    const divElement = document.getElementsByClassName("jumbotron-section-container")[0];
    setJumboWidth(divElement.offsetWidth);
    if(divElement.offsetWidth < 675){
        setMobileSize(true)
    }
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageNumber((prev) =>
        prev !== -3 ? Math.abs(prev) * -1 - 1 : 0
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleResize = () => {
    const divElement = document.getElementsByClassName("jumbotron-section-container")[0];
    setJumboWidth(divElement.offsetWidth);
    if(divElement.offsetWidth < 675){
        setMobileSize(true)
    }
  };
  useEffect(() => {
    // Add event listener when the component mounts
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClick = (event) => {
    const data = event.target.getAttribute("data-side");

    if (data === "left") {
      setCurrentImageNumber((prev) =>
        prev !== 0 ? Math.abs(prev) * -1 + 1 : -3
      );
    } else {
      setCurrentImageNumber((prev) =>
        prev !== -3 ? Math.abs(prev) * -1 - 1 : 0
      );
    }
  };
  return (
    <div className="jumbotron-section-container"  >
    <div className="jumbotron-slider-container">
      <div className="jumbotron-left-arrow-div">
        <button
          className="jumbotron-arrow-btn-left"
          data-side="left"
          onClick={handleClick}
        >
          <Image alt="left arrow" src={LeftArrow} data-side="left" className="jumbotron-arrow-left" />
        </button>
      </div>
      <div className="jumbotron-right-arrow-div" data-side="right">
        <button
          className="jumbotron-arrow-btn-right"
          data-side="right"
          onClick={handleClick}
        >
          <Image alt="right arrow" src={RightArrow} data-side="right" className="jumbotron-arrow-right" />
        </button>
      </div>
      <motion.div
        className="jumbotron-slider"
        animate={{
          x: currentImageNumber * jumboWidth,
        }}
        transition={{ duration: 1.5 }}
      >
        {images.map((image, index) => (
          <Jumbotron currentImage={image} key={image.id} mobile={mobileSize}/>
        ))}
      </motion.div>
      <div className="jumbotron-radio-buttons-div">
        <span className="radio-buttons-span">
          {images.map((image) => (
            <RadioButton
              key={image.id}
              selected={image.id === Math.abs(currentImageNumber) + 1}
              color="light"
            />
          ))}
        </span>
      </div>
      </div>
    </div>
  );
};
export default Main;