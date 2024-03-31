import { useState, useEffect } from "react";
import Loader from "@/components/loader";
import Image from "next/image";
import { calculateBarPercentage } from "@/lib/utils";
import { useRouter } from "next/router";
import { useStateContext } from "@/lib/context";
import { useContractRead } from "@thirdweb-dev/react";
import { daysLeft } from "@/lib/utils";
import CountBox from "@/components/countbox";

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
                className="w-full h-[410px] object-cover rounded-t-3xl rounded-b-md"
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
        </>
      ) : null}
    </div>
  );
}
