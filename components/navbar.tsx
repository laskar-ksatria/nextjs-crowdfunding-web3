import { useRouter } from "next/router";
import Image from "next/image";
import CustomButton from "@/components/custom-button";
import Link from "next/link";
import { ConnectWallet } from "@thirdweb-dev/react";

export default function Navbar() {
  return (
    <div className="flex md:flex-row flex-col-reverse   justify-between mb-[35px] gap-6 sticky">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
        <input
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
        </div>
      </div>

      <div className="flex-row justify-end hidden gap-4 sm:flex">
        <ConnectWallet
          modalSize="wide"
          btnTitle="Connect"
          className="connect"
        />
        {/* <CustomButton
          btnType="button"
          title="Connnect"
          styles="bg-[#8c6dfd]"
          // title={address ? "Create a campaign" : "Connect"}
          // styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
          handleClick={() => {
            // if (address) navigate("create-campaign");
            // else connect();
          }}
        /> */}

        <Link href="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <Image
              src="/img/thirdweb.png"
              alt="user"
              width={35}
              height={35}
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
