import { useState, useEffect } from "react";
import Loader from "@/components/loader";
import Image from "next/image";
import { calculateBarPercentage } from "@/lib/utils";
import { useRouter } from "next/router";

export default function Campaign() {
  const Router = useRouter();
  // States ********************************************************************** //
  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);
  const [campaign, setCampaign] = useState(null);
  // States ********************************************************************** //

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      {isLoading ? <Loader /> : null}
      {!isLoading ? (
        <div className="w-full md:flex-row flex-col mt-10 gap-[30px]">
          <div className="flex-1 flex-col">
            <img
              src={
                "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
              }
              alt="campaign"
              className="w-full h-[410px] object-cover rounded-t-3xl rounded-b-md"
            />
            <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2 rounded-lg">
              <div
                className="absolute h-full bg-[#4acd8d] rounded-lg"
                style={{
                  width: `${calculateBarPercentage(100, 75.3)}%`,
                  maxWidth: "100%",
                }}
              ></div>
            </div>
          </div>
          <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]"></div>
        </div>
      ) : null}
    </div>
  );
}
