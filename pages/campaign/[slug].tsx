import { useState, useEffect } from "react";
import Loader from "@/components/loader";
import Image from "next/image";
import { calculateBarPercentage } from "@/lib/utils";
import { useRouter } from "next/router";
import { useStateContext } from "@/lib/context";
import { useContractRead } from "@thirdweb-dev/react";
import { daysLeft } from "@/lib/utils";
import CountBox from "@/components/countbox";
import CustomButton from "@/components/custom-button";

export default function Campaign() {
  const Router = useRouter();
  const { getCampaign, contract } = useStateContext();
  // States ********************************************************************** //
  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);
  const [campaign, setCampaign] = useState(null);
  // States ********************************************************************** //

  const {
    data,
    isLoading: dataLoading,
    error,
  } = useContractRead(contract, "campaigns", [Router.query?.slug]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      {dataLoading ? <Loader /> : null}
      {data ? (
        <>
          <div className="w-full md:flex-row flex-col mt-10 gap-[30px]">
            <div className="flex-1 flex-col">
              <img
                src={data?.image}
                alt="campaign"
                className="w-full h-[580px] object-cover  rounded-t-[30px] rounded-b-md"
              />
              <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2 rounded-lg">
                <div
                  className="absolute h-full bg-[#4acd8d] rounded-lg"
                  style={{
                    width: `${calculateBarPercentage(
                      data?.target,
                      data?.amountCollected
                    )}%`,
                    maxWidth: "100%",
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="grid w-full grid-cols-3 mt-5">
            <div className="col-span-2">
              <div className="w-full flex gap-4">
                <CountBox title="Days Left" value="14" />
                <CountBox title={`Raised of 3`} value={"0.5"} />
                <CountBox title="Total Backers" value={"10"} />
              </div>
              <div className="mt-5">
                <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                  Creator
                </h4>
                <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                  <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                    <img
                      src="/img/thirdweb.png"
                      alt="user"
                      className="w-[60%] h-[60%] object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
                      {data.owner}
                    </h4>
                    <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">
                      10 Campaigns
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                  Story
                </h4>
                <div className="mt-[20px]">
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                    {data.description}
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                  Donators
                </h4>
                <div className="mt-[20px] flex flex-col gap-4">
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                    No donators yet. Be the first one!
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="flex flex-col p-4 bg-[#1c1c24] rounded-[10px] mt-5">
                <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
                  Fund the campaign
                </p>
                <div className="mt-[30px]">
                  <input
                    type="number"
                    placeholder="ETH 0.1"
                    step="0.01"
                    className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                    // value={amount}
                    // onChange={(e) => setAmount(e.target.value)}
                  />

                  <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                    <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                      Back it because you believe in it.
                    </h4>
                    <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                      Support the project for no reward, just because it speaks
                      to you.
                    </p>
                  </div>

                  <CustomButton
                    btnType="button"
                    title="Fund Campaign"
                    styles="w-full bg-[#8c6dfd]"
                    handleClick={() => {}}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
