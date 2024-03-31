import { useRouter } from "next/router";
import Image from "next/image";
import CustomButton from "@/components/custom-button";
import Link from "next/link";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useStateContext } from "@/lib/context";

export default function Navbar() {
  const { address } = useStateContext();
  return (
    <div className="flex md:flex-row flex-col-reverse   justify-between mb-[35px] gap-6 sticky">
      {/* <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]"> */}
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] rounded-[100px]">
        {/* <input
          type="text"
          placeholder="Search for campaigns"
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
        />
        <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
          <Image
            src="/img/search.svg"
            alt="search"
            width={15}
            height={15}
            className="w-[15px] h-[15px] object-contain"
          />
        </div> */}
      </div>

      <div className="flex-row justify-end hidden gap-4 sm:flex items-center">
        <ConnectWallet
          modalSize="wide"
          btnTitle="Connect"
          className="connect"
        />
        {address ? (
          <Link
            href="/profile"
            className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer"
          >
            <img
              src="https://pbs.twimg.com/media/F2YGo49aQAAa7hW.jpg"
              alt="user"
              className="w-[52px] h-[52px] object-contain rounded-full"
            />
          </Link>
        ) : null}
      </div>
    </div>
  );
}
