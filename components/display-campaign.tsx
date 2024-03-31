import FundCard from "./fundcard";
import { useRouter } from "next/router";

type DisplayCampaignType = {
  title: string;
  isLoading: boolean;
  campaigns: any;
};

export default function DisplayCampaign({
  title,
  isLoading,
  campaigns,
}: DisplayCampaignType) {
  // Utils
  const Router = useRouter();

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({campaigns.length})
      </h1>
      {isLoading ? (
        <div className="w-full h-[600px] flex justify-center items-center">
          <div>
            <img
              src="/img/loader.svg"
              alt="loader"
              className="w-[120px] h-[120px] object-contain"
            />
            <p className="text-center text-sm">Campaigns data</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap mt-[20px] gap-[26px]">
          {!isLoading && campaigns.length === 0 && (
            <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
              You have not created any campigns yet
            </p>
          )}
          {!isLoading && campaigns.length > 0 && (
            <>
              {campaigns.map((camp: any, i: any) => (
                <FundCard
                  key={`${i}-campaign`}
                  owner={camp.owner}
                  title={camp.title}
                  description={camp.description}
                  tag={camp.tag}
                  slug={camp.slug}
                  target={camp.target}
                  deadline={"15 April 2024"}
                  amountCollected={0.5}
                  handleClick={() => {
                    alert("HELLO");
                    // Router.push(`/campaign/${camp.slug}`);
                  }}
                  image={camp.image}
                />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
