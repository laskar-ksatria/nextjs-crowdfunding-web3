// utils
import { useState } from "react";
import { useRouter } from "next/router";

// Components
import Loader from "@/components/loader";
import FormField from "@/components/form-filed";
import CustomButton from "@/components/custom-button";
import { toast } from "react-toastify";
import { ConnectWallet } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { checkIfImage } from "@/lib/utils";

// Utils
import { useStateContext } from "@/lib/context";

export default function CreateCampaign() {
  // Utils
  const Router = useRouter();
  const { publishCampaign, connect, address } = useStateContext();

  // States
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  const [tag] = useState(["Education", "Nature", "Humanity", "Others"]);
  const [selectTag, setSelectTag] = useState("Education");
  // Functions
  const handleFormFieldChange = (
    fieldName: string,
    e: { target: { value: any } }
  ) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists: boolean) => {
      if (exists) {
        setIsLoading(true);
        const data = await publishCampaign({
          ...form,
          tag: selectTag,
          target: ethers.utils.parseUnits(form.target, 18),
        });
        if (data) {
          toast.success("Success added", {
            onClose(props) {
              Router.push("/");
            },
          });
        } else {
          toast.error("Error Addedd");
          setIsLoading(false);
        }
      } else {
        toast.error("Provide valid image URL");
      }
    });
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 py-4">
      {isLoading ? <Loader /> : null}
      {/* {!address ? (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center fixed top-0 left-0 bg-black bg-opacity-70 overflow-y-hidden">
          <div className="w-[290px] flex justify-center items-center h-[150px] bg-white border-[1px] border-[#4acd8d] rounded-3xl">
            <ConnectWallet
              modalSize="wide"
              btnTitle="Connect"
              className="connect"
            />
          </div>
        </div>
      ) : null} */}
      {/* <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Start a Campaign
        </h1>
      </div> */}
      <form
        className="w-full mt-0 flex flex-col gap-[30px]"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Owner *"
            placeholder="0x9F1bBB29873Bb18xxx"
            inputType="text"
            value={address}
            disable={true}
            isTextArea={false}
            handleChange={(e: any) => handleFormFieldChange("name", e)}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            isTextArea={false}
            handleChange={(e: any) => handleFormFieldChange("title", e)}
          />
        </div>
        <FormField
          inputType={"textarea"}
          labelName="Story *"
          placeholder="Write your story"
          isTextArea={true}
          value={form.description}
          handleChange={(e: any) => handleFormFieldChange("description", e)}
        />
        <div className="w-full flex justify-start items-center bg-[#8c6dfd] h-[80px] px-5 rounded-[10px]">
          <img
            src={"/img/money.svg"}
            alt="money"
            className="w-[40px] h-[40px] object-contain"
          />
          <h4 className="font-epilogue font-bold text-[16px] text-white ml-[20px]">
            You will get 100% of the raised amount
          </h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            isTextArea={false}
            value={form.target}
            handleChange={(e: any) => handleFormFieldChange("target", e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            isTextArea={false}
            handleChange={(e: any) => handleFormFieldChange("deadline", e)}
          />
        </div>
        <FormField
          labelName="Campaign image *"
          placeholder="Place image URL of your campaign"
          inputType="url"
          value={form.image}
          isTextArea={false}
          handleChange={(e: any) => handleFormFieldChange("image", e)}
        />

        <div>
          <p className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
            Choose Tag
          </p>
          {tag.map((item) => (
            <div key={item} className="mt-2">
              <input
                type="radio"
                id={item}
                checked={selectTag === item ? true : false}
                name={item}
                value={item}
                className="bg-[#808191]"
                onChange={(e: any) => {
                  setSelectTag(e.target.value);
                }}
              />
              <label className="ml-3 text-[#808191]" htmlFor={item}>
                {item}
              </label>
              <br />
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071] w-full bg-[#1dc079]"
            handleClick={() => {}}
          />
        </div>
      </form>
    </div>
  );
}
