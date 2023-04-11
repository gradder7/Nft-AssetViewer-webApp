import { useState } from "react";
import ChainSelector from "./components/chainSelector";
import NftCard from "./components/nftcard";
import { fetchNFTs } from "./utils/fetchNFTs";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";

const Explore = () => {
  const [owner, setOwner] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [NFTs, setNFTs] = useState("");
  const [chain, setBlockchain] = useState("Ethereum");

  const handleClick = () => {
    if (owner === "") {
      toast.error("Please Enter the address!");
      return;
    } else {
      toast("Getting NFT please...");
      fetchNFTs(owner, setNFTs, chain, contractAddress);
    }
  };
  return (
    <div>
      <header className=" py-24  mb-12 w-full bg-gray-900">
        <div className="flex-grow flex justify-end mr-12 mb-12"></div>
        <div className="flex flex-col items-center mb-12">
          <div className="mb-16 text-white text-center">
            <h1 className="text-8xl  font-bold font-body mb-10">
              NFT - Explorer
            </h1>
            <p>
              Multichain inspector to find NFTs by owner and contract address{" "}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center mb-4 w-2/6 gap-y-2 ">
            <input
              className="border rounded-sm focus:outline-none py-2 px-3 w-full"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              placeholder="Insert your wallet address"
            ></input>
            <br />
            <input
              className="focus:outline-none rounded-sm py-2 px-3 w-full"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              placeholder="Insert NFT address (optional)"
            ></input>
            <ChainSelector setBlockchain={setBlockchain} chain={chain} />
          </div>
          <div className="w-2/6 flex justify-center">
            <button
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-20 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={handleClick}
            >
              Search
            </button>
          </div>
        </div>
      </header>

      <InfiniteScroll dataLength={NFTs.length}>
        <section className="flex flex-wrap justify-center">
          {NFTs ? (
            NFTs.map((NFT) => {
              return (
                <NftCard
                  key={NFT.value.id + NFT.value.contractAddress + "data"}
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
          )}
        </section>
      </InfiniteScroll>
    </div>
  );
};

export default Explore;
