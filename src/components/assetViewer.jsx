import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatEther, parseUnits } from "@ethersproject/units";
import { AlchemyProvider } from "@ethersproject/providers";

const AssetViewer = ({ address }) => {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const alchemyProvider = new AlchemyProvider(
      "homestead",
      process.env.REACT_APP_ALCHEMY_API_KEY
    );
    // const fetchTokens = async () => {
    //   const networks = {
    //     1: "Ethereum Mainnet",
    //     4: "Rinkeby Test Network",
    //     5: "Goerli Test Network",
    //     42: "Kovan Test Network",   
    //   };
    //   const promises = Object.keys(networks).map(async (networkId) => {
    //     const url = `https://api.ethplorer.io/getAddressInfo/0xdAC17F958D2ee523a2206206994597C13D831ec7?apiKey=freekey&tokens=10&showZeroBalances=false&network=${networkId}`;
    //     const response = await axios.get(url);
    //     const { data } = response;
    //     const tokens = data.tokens.map((token) => ({
    //       ...token,
    //       network: networks[networkId],
    //       balance: formatEther(token.balance),
    //     }));
    //     console.log("-------->",tokens);
        
    //     return tokens;
    //   });

    //   const tokensByNetwork = await Promise.all(promises);
    //   const allTokens = tokensByNetwork.flat();
    //   const topTokens = allTokens
    //     .filter((token) => token.balance > 0)
    //     .sort((a, b) => b.balance - a.balance)
    //     .slice(0, 10);
    //   setTokens(topTokens);
    // };
    const fetchTokens = async () => {
      const networks = {
        1: "Ethereum Mainnet",
        4: "Rinkeby Test Network",
        5: "Goerli Test Network",
        42: "Kovan Test Network",
      };
      const promises = Object.keys(networks).map(async (networkId) => {
        const url = `https://api.ethplorer.io/getAddressInfo/0xdAC17F958D2ee523a2206206994597C13D831ec7?apiKey=freekey&tokens=10&showZeroBalances=false&network=1`;
        const response = await axios.get(url);
        const { data } = response;
        const tokens = data.tokens.map((token) => {
          const balance = parseUnits(
            token.balance,
            token.tokenInfo.decimals
          ).toString();
          return {
            ...token,
            network: networks[networkId],
            balance,
          };
        });
        console.log("-------->", tokens);

        return tokens;
      });

      const tokensByNetwork = await Promise.all(promises);
      const allTokens = tokensByNetwork.flat();
      const topTokens = allTokens
        .filter((token) => token.balance > 0)
        .sort((a, b) => b.balance - a.balance)
        .slice(0, 10);
      setTokens(topTokens);
    };


    fetchTokens();
  }, [address]);
  
  return (
    // <div className="w-full max-w-7xl mx-auto px-4 py-12">
    //   <h2 className="text-3xl font-medium text-gray-900">Top Tokens</h2>
    //   <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
    //     {tokens.map((token, index) => (
    //       <div
    //         key={index}
    //         className="bg-white overflow-hidden shadow rounded-lg"
    //       >
    //         <div className="px-4 py-5 sm:p-6">
    //           <dl>
    //             <dt className="text-sm font-medium text-gray-500 truncate">
    //               {token.tokenInfo.name}
    //             </dt>
    //             <dd className="mt-1 text-3xl font-semibold text-gray-900">
    //               {token.balance}
    //             </dd>
    //             <dd className="mt-1 text-sm font-medium text-gray-500 truncate">
    //               {token.network}
    //             </dd>
    //           </dl>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div>hello</div>
  );
};

export default AssetViewer;
