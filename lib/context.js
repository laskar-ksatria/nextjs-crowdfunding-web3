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

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0xc46a2d938345342355f89B49f93C712d20aA587A"
    // "0x5642d56a7974764c466CCa4Ca02e283b5FF704da"
    // "0x3516C0b814eb00C4f29a1f86a606a7C740763990"
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

  return (
    <StateContext.Provider
      value={{
        getCampaigns,
        address,
        contract,
        connect,
        publishCampaign,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
