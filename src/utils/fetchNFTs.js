const getAddressNFTs = async (endpoint, owner, contractAddress) => {
  if (owner) {
    let data;
    try {
      if (contractAddress) {
        console.log(contractAddress);

        data = await fetch(
          `${endpoint}/getNFTs?owner=${owner}&contractAddresses%5B%5D=${contractAddress}`
        ).then((data) => data.json());
      } else {
        console.log(owner);

        // data = await fetch(`${endpoint}/v1/getNFTs?owner=${owner}`).then(data => data.json())
        data = await fetch(
          `${endpoint}/getNFTs?owner=${owner}&withMetadata=true&pageSize=10`
        ).then((data) => data.json());
        console.log(data);
      }
      // console.log("GETNFTS: ", data)
    } catch (e) {
      console.log(e);

      //   getAddressNFTs(endpoint, owner, contractAddress);
    }
    return data;
  }
};

const getEndpoint = (chain) => {
  switch (chain) {
    case "Ethereum":
      return process.env.REACT_APP_ALCHEMY_ETHEREUM_ENDPOINT;

    case "Polygon":
      return process.env.REACT_APP_ALCHEMY_POLYGON_ENDPOINT;

    case "Mumbai":
      return process.env.REACT_APP_ALCHEMY_MUMBAI_ENDPOINT;

    case "Rinkeby":
      return process.env.REACT_APP_ALCHEMY_RINKEBY_ENDPOINT;
  }
};

const fetchNFTs = async (owner, setNFTs, chain, contractAddress) => {
  let endpoint = getEndpoint(chain);
//   console.log("chain=>", getEndpoint(chain));
//   console.log(chain);
  console.log(process.env.REACT_APP_ALCHEMY_ETHEREUM_ENDPOINT);
//   let endpoint ="https://eth-mainnet.alchemyapi.io/v2/GGkq93jRTGzlbLTriKdvPu7DZlxHItlg";
  const data = await getAddressNFTs(endpoint, owner, contractAddress);
  console.log("my data", data);

  if (data.ownedNfts.length) {
    const NFTs = await getNFTsMetadata(data.ownedNfts, endpoint);
    console.log("NFTS metadata", NFTs);
    let fullfilledNFTs = NFTs.filter((NFT) => NFT.status == "fulfilled");
    console.log("NFTS", fullfilledNFTs);
    setNFTs(fullfilledNFTs);
  } else {
    setNFTs(null);
  }
};

const getNFTsMetadata = async (NFTS, endpoint) => {
  let data;
  console.log("all nfts", NFTS);

  const NFTsMetadata = Promise.allSettled(
    NFTS.map(async (NFT) => {
      const metadata = await fetch(
        `${endpoint}/v1/getNFTMetadata?contractAddress=${NFT.contract.address}&tokenId=${NFT.id.tokenId}`
      ).then((data) => data.json());
      let image;
      console.log("metadata", metadata);
      if (metadata.media[0].gateway.length) {
        image = metadata.media[0].gateway;
        console.log("image", image);
      } else {
        image = "https://via.placeholder.com/500";
      }

      return {
        id: NFT.id.tokenId,
        contractAddress: NFT.contract.address,
        image,
        // name
        title: metadata.metadata.name,
        description: metadata.metadata.description,
        attributes: metadata.metadata.attributes,
      };
    })
  );
  //   console.log("===>,", NFTsMetadata);

  return NFTsMetadata;
};

export { fetchNFTs, getAddressNFTs };