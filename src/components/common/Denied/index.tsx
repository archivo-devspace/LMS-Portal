"use client";

import dynamic from "next/dynamic";
import accessDeniedAnimation from "../../../../public/lottiefiles/denied.json"; // Replace with the path to your Lottie JSON file

import Button from "@/components/utils/Button";
import { useRouter } from "next/navigation";
import React from "react";

const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

const AccessDenied = () => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <div className="flex items-center justify-center h-full w-full bg-gray-50 p-4">
      <div className="flex flex-col items-center lg:w-[35%] lg:h-[35%] w-[30%] h-[30%] justify-center">
        <Lottie
          loop
          animationData={accessDeniedAnimation}
          play
          //   className=" lg:w-[35%] lg:h-[35%] w-[30%] h-[30%]"
        />

        {/* <Link href="/">
          <p className="text-blue-500 hover:underline">Return Home</p>
        </Link> */}
        <Button
          btnType="text"
          btnLabel="Back"
          btnVarient="default"
          handleClick={handleClick}
          htmlType="button"
          btnSize="large"
        />
      </div>
    </div>
  );
};

export default AccessDenied;
