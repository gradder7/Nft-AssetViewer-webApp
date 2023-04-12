import React from "react";
import NftCard from "./nftcard";
import { fetchNFTs } from "../utils/fetchNFTs";
import { useEffect, useState } from "react";

function NftViewer({ accountData, chain }) {
  const [NFTs, setNFTs] = useState();
  const [loading, setLoading] = useState(false);

  let user = "0x928c2909847B884ba5Dd473568De6382b028F7b8";
  const runfunc = useEffect(async () => {
    setLoading(true);
    if (accountData) {
      // owner, setNFTs, chain, contractAddress, setLoading;
      // accountData.address;
      const data = await fetchNFTs(user, setNFTs, chain, "", setLoading);
    }
  }, [accountData && accountData.address, chain]);

  return (
    <>
      {/* <p>
        NFTs:<span>{NFTs ? NFTs.length : 0}</span>
      </p> */}

      <div className="mt-4"></div>
      {loading ? (
        <h1>Loading...</h1>
      ) : NFTs ? (
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
              floorPrice={NFT.value.floorPrice}
            ></NftCard>
          );
        })
      ) : (
        <div>No NFTs found</div>
      )}
    </>
  );
}

export default NftViewer;
