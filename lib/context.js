import { useContext, createContext } from "react";

import { ethers } from "ethers";
import { EditionMetadataWithOwnerOutputSchema } from "@thirdweb-dev/sdk";
import {
  useContract,
  useContractRead,
  useAddress,
  useContractWrite,
  useConnect,
  metamaskWallet,
} from "@thirdweb-dev/react";
import { resolveMethod, readContract } from "thirdweb";

const StateContext = createContext();
// 0xc46a2d938345342355f89b49f93c712d20aa587a;
export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0xc46a2d938345342355f89B49f93C712d20aA587A"
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const connect = metamaskWallet();
  const address = useAddress();

  const sampleData = {
    name: "Laskar",
    title: "Title",
    description: "Sub Title",
    target: "3",
    deadline: "2024-04-05",
    image:
      "https://media.istockphoto.com/id/1317323736/photo/a-view-up-into-the-trees-direction-sky.jpg?s=612x612&w=0&k=20&c=i4HYO7xhao7CkGy7Zc_8XSNX_iqG0vAwNsrH1ERmw2Q=",
  };

  const parseSlug = (str) => {
    return str.toLowerCase().split(" ").join("-");
  };

  const publishCampaign = async (form) => {
    try {
      const args = [
        address,
        form.title,
        form.description,
        form.tag,
        parseSlug(form.title),
        form.target,
        new Date(form.deadline).getTime(),
        form.image,
      ];
      // [
      //   "0x9F1bBB29873Bb18816C29fc1F45f393C26BAbDCb",
      //   "Save Charmeleon",
      //   "Sava Charmeleon",
      //   "Education",
      //   "save-charmeleon",
      //   { type: "BigNumber", hex: "0x29a2241af62c0000" },
      //   1712361600000,
      //   "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
      // ];
      // alert(JSON.stringify(args));
      const data = await createCampaign({
        args,
      });
      console.log(data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getCampaigns = async () => {
    const allCamp = await contract.call("getCampaign");
    console.log(allCamp);
    if (allCamp.length === 0) return allCamp;
    const parsedCampaings = allCamp.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      tag: campaign.tag,
      slug: campaign.slug,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      image: campaign.image,
      pId: i,
    }));
    return parsedCampaings;
  };

  const getCampaign = async (slug) => {
    try {
      const { data, isLoading, error } = useContractRead(
        contract,
        "campaigns",
        args,
        ["save-charmeleon"]
      );
      // const data = await readContract({
      //   contract,
      //   method: resolveMethod("campaigns"),
      //   params: ["save-charmeleon"],
      // });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StateContext.Provider
      value={{
        getCampaigns,
        address,
        contract,
        connect,
        publishCampaign,
        getCampaign,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
