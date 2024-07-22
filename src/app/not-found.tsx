"use client";
import Link from "next/link";
import Lottie from "react-lottie-player";
import notFoundAnimation from "../../public/lottiefiles/404.json"; // Replace with the path to your Lottie JSON file
import Button from "@/components/utils/Button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center h-[100vh] w-full bg-gray-50 p-4">
      <div className="flex flex-col items-center">
        <Lottie
          loop
          animationData={notFoundAnimation}
          play
          className="w-full h-[80vh]"
        />

        {/* <Link href="/">
          <p className="text-blue-500 hover:underline">Return Home</p>
        </Link> */}
        <Button
          btnType="primary"
          btnLabel="Return Home"
          btnVarient="default"
          handleClick={handleClick}
          htmlType="button"
          btnSize="large"
          btnStyles="w-[200px]"
        />
      </div>
    </div>
  );
}
