import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CustomButton from "@/components/custom-button";
import Link from "next/link";
import DisplayCampaign from "@/components/display-campaign";
import { useStateContext } from "@/lib/context";

export default function HomePage() {
  const { getCampaigns, contract, connect } = useStateContext();
  const [isLoading, setIsLoading] = useState(true);

  const [campaigns, setCampaigns] = useState([]);

  const handleGetData = async () => {
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) handleGetData();
  }, [contract]);

  return (
    <>
      <DisplayCampaign
        title="All Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </>
  );
}
