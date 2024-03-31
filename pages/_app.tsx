import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import { Sepolia } from "@thirdweb-dev/chains";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ZustandProvider, useCreateStore } from "@/store";
import { StateContextProvider } from "@/lib/context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  const createStore = useCreateStore();
  return (
    <ThirdwebProvider
      clientId={"ceb9b99ece7dddc1fc77a143678536f2"}
      activeChain={Sepolia}
    >
      <ZustandProvider createStore={createStore}>
        <StateContextProvider>
          <ToastContainer
            autoClose={3000}
            theme={"dark"}
            position={"top-left"}
          />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </StateContextProvider>
      </ZustandProvider>
    </ThirdwebProvider>
  );
}
