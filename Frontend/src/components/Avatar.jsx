/* eslint-disable react/prop-types */
"use client"
import { useEffect, useState } from "react";

const Avatar = ({ imagen, className }) => {
  const [picture, setPicture] = useState("/Profile1.png")
  useEffect(()=>{
    if (imagen){
      setPicture(imagen)
    }
  },[imagen])
  return (
    <div
      className={`${
        className ? className : "w-[220px] h-[220px] mt-[29px]"
      } relative flex items-center justify-center `}
    >
      <img src="/avatar-border.png" alt="borde" className="absolute" />
      <img
        className={`${
          className ? className : "w-[198px] h-[198px] rounded-full"
        }`}
        src={picture}
        alt="avatar"
      />
    </div>
  );
};

export default Avatar;
