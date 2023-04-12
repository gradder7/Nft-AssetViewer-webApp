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

const MyProfile = () => {
  const [{ data: accountData, loading }, disconnect] = useAccount();
  const [chain, setBlockchain] = useState("Ethereum");
  const [toggeleNftAsset, setToggleNftAsset] = useState("");
  const [NFTs, setNFTs] = useState();

  const runfunc = useEffect(async () => {
    if (accountData) {
      const data = await fetchNFTs(accountData.address, setNFTs, chain);
    }
  }, [accountData && accountData.address, chain]);

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

              <div className="mt-4">
                <p>
                  NFTs:<span>{NFTs ? NFTs.length : 0}</span>
                </p>
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
              NFTs ? (
                NFTs.map((NFT) => {
                  return (
                    <NftCard
                      key={NFT.value.id + NFT.value.contractAddress}
                      image={NFT.value.image}
                      id={NFT.value.id}
                      title={NFT.value.title}
                      description={NFT.value.description}
                      address={NFT.value.contractAddress}
                      attributes={NFT.value.attributes}
                    ></NftCard>
                  );
                })
              ) : (
                <div>No NFTs found</div>
              )
            ) : toggeleNftAsset === "asset" ? (
              <AssetViewer address={accountData.address} />
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
