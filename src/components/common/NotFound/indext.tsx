"use client";

import dynamic from "next/dynamic";
import notFoundAnimation from "../../../../public/lottiefiles/404.json"; // Replace with the path to your Lottie JSON file

import Button from "@/components/utils/Button";
import { useRouter } from "next/navigation";
import React from "react";

const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

const NotFoundUi = () => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <div className="flex items-center justify-center h-[100vh] w-full bg-gray-50 p-4">
      <div className="flex flex-col items-center">
        <div className="w-full h-[80vh]">
          <Lottie
            loop
            animationData={notFoundAnimation}
            play
            className="w-full h-[80vh]"
          />
        </div>

        {/* <Link href="/">
          <p className="text-blue-500 hover:underline">Return Home</p>
        </Link> */}
        <Button
          btnType="primary"
          btnLabel="Back"
          btnVarient="default"
          handleClick={handleClick}
          htmlType="button"
          btnSize="large"
          btnStyles="w-[200px]"
        />
      </div>
    </div>
  );
};

export default NotFoundUi;
