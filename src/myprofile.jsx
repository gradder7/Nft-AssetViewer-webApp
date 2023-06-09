import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { fetchNFTs } from "./utils/fetchNFTs";
import NftCard from "./components/nftcard";
import Login from "./login";
import ChainSelector from "./components/chainSelector";
import ProfileImage from "./utils/profileImages";
import { ClipboardIcon } from "@heroicons/react/outline";
import AssetViewer from "./components/assetViewer";
import InfiniteScroll from "react-infinite-scroll-component";
import NftViewer from "./components/NftViewer";

const MyProfile = () => {
  let userId = "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0";
  const [{ data: accountData, loading }, disconnect] = useAccount();
  const [chain, setBlockchain] = useState("Ethereum");
  const [toggeleNftAsset, setToggleNftAsset] = useState("");

  return (
    <div>
      {loading ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : accountData ? (
        <div>
          <header className=" py-40  mb-12 w-full flex flex-col items-center justify-center bg-gray-900 text-white ">
            <ProfileImage width={"250"} />
            <div className="flex flex-col items-center">
              <div className="flex items-center">
                <h3 className="mt-4 text-l">{accountData.address}</h3>
                <ClipboardIcon
                  onClick={() =>
                    navigator.clipboard.writeText(accountData.address)
                  }
                  className="h-4 w-4 -mt-2 text-slate-200 cursor-pointer"
                ></ClipboardIcon>
              </div>

              
              <ChainSelector setBlockchain={setBlockchain} chain={chain} />
            </div>
            <div className="mt-10">
              <button
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-10 mb-2"
                onClick={() => {
                  setToggleNftAsset("nft");
                }}
              >
                NFT VIEWER
              </button>
              <button
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={() => {
                  setToggleNftAsset("asset");
                }}
              >
                Asset VIEWER
              </button>
            </div>
          </header>

          <div className="flex flex-wrap justify-center">
            {toggeleNftAsset === "nft" ? (
              <NftViewer accountData={accountData} chain={chain}/>
            ) : toggeleNftAsset === "asset" ? (
              <AssetViewer address={accountData.address} userId={userId} />
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <div>
          <Login />
        </div>
      )}
    </div>
  );
};

export default MyProfile;
