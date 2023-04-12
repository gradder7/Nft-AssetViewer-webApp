import React, { useEffect, useState } from "react";
import axios from "axios";
import { AlchemyProvider } from "@ethersproject/providers";
import logo from "../assets/images/crypto.png";
import { formatUnits } from "@ethersproject/units";

const AssetViewer = ({ address }) => {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const alchemyProvider = new AlchemyProvider(
      "homestead",
      process.env.REACT_APP_ALCHEMY_API_KEY
    );
    const fetchTokens = async () => {
      const covalentAPIKey = process.env.REACT_APP_COVALENT_API_KEY;
      const covalentAPIURL = "https://api.covalenthq.com/v1";

      const networks = {
        1: "Ethereum Mainnet",
        4: "Rinkeby Test Network",
        5: "Goerli Test Network",
        42: "Kovan Test Network",
      };

      const promises = Object.keys(networks).map(async (networkId) => {
        // const url = `https://api.covalenthq.com/v1/1/address/${address}/balances_v2/?key=${covalentAPIKey}&nft=false&no-nft-fetch=true&quote-currency=USD&page-size=1000`;
        const url = `https://api.covalenthq.com/v1/1/address/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0/balances_v2/?key=ckey_ae99d142074e43cca31f9537b17&nft=false&no-nft-fetch=true&quote-currency=USD&page-size=1000`;
        const response = await axios.get(url);
        const { data } = response;

        // const tokens = data.data.items
        //   .filter((token) => token.balance > 0)
        //   .sort((a, b) => b.balance - a.balance)
        //   .slice(0, 10)
        //   .map((token) => {
        //     const balance = formatEther(
        //       parseUnits(token.balance, token.contract_decimals)
        //     );\
        const tokens = data.data.items
          .filter((token) => token.balance > 0)
          .map((token) => {
            const decimals = token.supports_erc.includes("erc20")
              ? token.contract_decimals
              : 0;
            const balance = decimals
              ? formatUnits(token.balance, decimals)
              : token.balance;

            return {
              tokenInfo: {
                name: token.contract_ticker_symbol,
                symbol: token.contract_ticker_symbol,
                decimals: token.contract_decimals,
                logoUrl: token.logo_url,
                price: token.quote_rate,
                volume: token.quote,
              },
              network: networks[networkId],
              balance,
            };
          })
          .sort((a, b) => b.balance - a.balance);

        return tokens;
      });

      const tokensByNetwork = await Promise.all(promises);
      const allTokens = tokensByNetwork.flat();
      setTokens(allTokens);
    };

    fetchTokens();
  }, [address]);

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-medium text-gray-900">Top Tokens</h2>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tokens.map((token, index) => (
          <div
            key={index}
            className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
          >
            <a
              href={token.tokenInfo.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex p-6">
                <div className="w-16 h-16">
                  <img
                    src={token.tokenInfo.logoUrl || { logo }}
                    alt={`${token.tokenInfo.name} logo`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="ml-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {token.tokenInfo.name}
                      </h3>
                    </div>
                    <div className="flex-shrink-0">
                      <p className="text-lg font-medium text-gray-900">
                        <span>Quote Rate:</span> $
                        {numberWithCommas(
                          Math.round(token.tokenInfo.price * 100) / 100
                        )}
                      </p>
                      <p className="text-sm text-gray-500">
                        Quote:{" "}
                        {numberWithCommas(
                          Math.round(token.tokenInfo.volume * 100) / 100
                        )}{" "}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    <span className="font-medium text-gray-900">Balance:</span>{" "}
                    ${Math.round(token.balance * 100) / 100} ({token.network})
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetViewer;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { formatEther, parseUnits } from "@ethersproject/units";
// import { AlchemyProvider } from "@ethersproject/providers";

// const AssetViewer = ({ address }) => {
//   const [tokens, setTokens] = useState([]);

//   useEffect(() => {
//     const alchemyProvider = new AlchemyProvider(
//       "homestead",
//       process.env.REACT_APP_ALCHEMY_API_KEY
//     );

//     // const fetchTokens = async () => {
//     //   const networks = {
//     //     1: "Ethereum Mainnet",
//     //     4: "Rinkeby Test Network",
//     //     5: "Goerli Test Network",
//     //     42: "Kovan Test Network",
//     //   };
//     //   const promises = Object.keys(networks).map(async (networkId) => {
//     //     const url = `https://api.ethplorer.io/getAddressInfo/0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0?apiKey=freekey&tokens=10&showZeroBalances=false&network=${networkId}`;
//     //     const response = await axios.get(url);
//     //     const { data } = response;
//     //     const tokens = data.tokens.map((token) => {
//     //       const balance = parseUnits(
//     //         token.balance.toString(),
//     //         token.tokenInfo.decimals
//     //       ).toString();

//     //       return {
//     //         ...token,
//     //         network: networks[networkId],
//     //         balance,
//     //       };
//     //     });
//     //     console.log("-------->", data);

//     //     return tokens;
//     //   });

//     //   const tokensByNetwork = await Promise.all(promises);
//     //   const allTokens = tokensByNetwork.flat();
//     //   const topTokens = allTokens
//     //     .filter((token) => token.balance > 0)
//     //     .sort((a, b) => b.balance - a.balance)
//     //     .slice(0, 10);
//     //   setTokens(topTokens);
//     // };
//     const fetchTokens = async () => {
//       const covalentAPIKey = process.env.REACT_APP_COVALENT_API_KEY;
//       const covalentAPIURL = "https://api.covalenthq.com/v1";

//       const networks = {
//         1: "Ethereum Mainnet",
//         4: "Rinkeby Test Network",
//         5: "Goerli Test Network",
//         42: "Kovan Test Network",
//       };

//       const promises = Object.keys(networks).map(async (networkId) => {
//         // const url = `${covalentAPIURL}/${networks[networkId]}/address/${address}/balances_v2/?key=${covalentAPIKey}&nft=false&no-nft-fetch=true&quote-currency=USD&page-size=1000`;
//         const url = `https://api.covalenthq.com/v1/1/address/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0/balances_v2/?key=ckey_ae99d142074e43cca31f9537b17&nft=false&no-nft-fetch=true&quote-currency=USD&page-size=1000`;
//         const response = await axios.get(url);
//         const { data } = response;

//         const tokens = data.data.items
//           .filter((token) => token.balance > 0)
//           .sort((a, b) => b.balance - a.balance)
//           .slice(0, 10)
//           .map((token) => {
//             const balance = formatEther(
//               parseUnits(token.balance, token.contract_decimals)
//             );

//             console.log("my data", token);

//             return {
//               tokenInfo: {
//                 name: token.contract_ticker_symbol,
//                 symbol: token.contract_ticker_symbol,
//                 decimals: token.contract_decimals,
//               },
//               network: networks[networkId],
//               balance,
//             };
//           });

//         return tokens;
//       });

//       const tokensByNetwork = await Promise.all(promises);
//       const allTokens = tokensByNetwork.flat();
//       setTokens(allTokens);
//     };

//     fetchTokens();
//   }, [address]);

//   return (
//     // <div className="w-full max-w-7xl mx-auto px-4 py-12">
//     //   <h2 className="text-3xl font-medium text-gray-900">Top Tokens</h2>
//     //   <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//     //     {tokens.map((token, index) => (
//     //       <div
//     //         key={index}
//     //         className="bg-white overflow-hidden shadow rounded-lg"
//     //       >
//     //         <div className="px-4 py-5 sm:p-6">
//     //           <dl>
//     //             <dt className="text-sm font-medium text-gray-500 truncate">
//     //               {token.tokenInfo.name}
//     //             </dt>
//     //             <dd className="mt-1 text-3xl font-semibold text-gray-900">
//     //               {token.balance}
//     //             </dd>
//     //             <dd className="mt-1 text-sm font-medium text-gray-500 truncate">
//     //               {token.network}
//     //             </dd>
//     //           </dl>
//     //         </div>
//     //       </div>
//     //     ))}
//     //   </div>
//     // </div>

//     <div className="w-full max-w-7xl mx-auto px-4 py-12">
//       <h2 className="text-3xl font-medium text-gray-900">Top Tokens</h2>
//       <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//         {tokens.map((token, index) => (
//           <div
//             key={index}
//             className="bg-white overflow-hidden shadow rounded-lg"
//           >
//             <div className="px-4 py-5 sm:p-6">
//               <dl>
//                 <dt className="text-sm font-medium text-gray-500 truncate">
//                   {token.tokenInfo.name}
//                 </dt>
//                 <dd className="mt-1 text-3xl font-semibold text-gray-900">
//                   {token.balance}
//                 </dd>
//                 <dd className="mt-1 text-sm font-medium text-gray-500 truncate">
//                   {token.network}
//                 </dd>
//               </dl>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AssetViewer;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { formatEther, parseUnits } from "@ethersproject/units";
// import { AlchemyProvider } from "@ethersproject/providers";
// // import logo from "./logo.png"; // import logo

// const AssetViewer = ({ address }) => {
//   const [tokens, setTokens] = useState([]);

//   useEffect(() => {
//     const alchemyProvider = new AlchemyProvider(
//       "homestead",
//       process.env.REACT_APP_ALCHEMY_API_KEY
//     );
//     const fetchTokens = async () => {
//       const covalentAPIKey = process.env.REACT_APP_COVALENT_API_KEY;
//       const covalentAPIURL = "https://api.covalenthq.com/v1";

//       const networks = {
//         1: "Ethereum Mainnet",
//         4: "Rinkeby Test Network",
//         5: "Goerli Test Network",
//         42: "Kovan Test Network",
//       };

//       const promises = Object.keys(networks).map(async (networkId) => {
//         const url = `https://api.covalenthq.com/v1/1/address/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0/balances_v2/?key=ckey_ae99d142074e43cca31f9537b17&nft=false&no-nft-fetch=true&quote-currency=USD&page-size=1000`;
//         const response = await axios.get(url);
//         const { data } = response;

//         const tokens = data.data.items
//           .filter((token) => token.balance > 0)
//           .sort((a, b) => b.balance - a.balance)
//           .slice(0, 10)
//           .map((token) => {
//             const balance = formatEther(
//               parseUnits(token.balance, token.contract_decimals)
//             );

//             console.log("my data", token);

//             return {
//               tokenInfo: {
//                 name: token.contract_ticker_symbol,
//                 symbol: token.contract_ticker_symbol,
//                 decimals: token.contract_decimals,
//                 logoUrl: token.logo_url, // add logo URL
//                 websiteUrl: token.contract_website, // add website URL
//               },
//               network: networks[networkId],
//               balance,
//             };
//           });

//         return tokens;
//       });

//       const tokensByNetwork = await Promise.all(promises);
//       const allTokens = tokensByNetwork.flat();
//       setTokens(allTokens);
//     };

//     fetchTokens();
//   }, [address]);
//   return (
//     <div className="w-full max-w-7xl mx-auto px-4 py-12">
//       <h2 className="text-3xl font-medium text-gray-900">Top Tokens</h2>
//       <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//         {tokens.map((token, index) => (
//           <div
//             key={index}
//             className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
//           >
//             <a
//               href={token.tokenInfo.websiteUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <div className="p-6">
//                 <img
//                   src={token.tokenInfo.logoUrl} // use logo URL or fallback to default logo
//                   alt={`${token.tokenInfo.name} logo`}
//                   className="w-12 h-12 object-contain mx-auto mb-4"
//                 />
//                 <dl>
//                   <dt className="text-sm font-medium text-gray-500 truncate">
//                     {token.tokenInfo.name}
//                   </dt>
//                   <dd className="mt-1 text-2xl font-semibold text-gray-900">
//                     {token.balance} {token.tokenInfo.symbol}
//                   </dd>
//                   <dd className="mt-1 text-sm font-medium text-gray-500">
//                     {token.network}
//                   </dd>
//                 </dl>
//               </div>
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
// export default AssetViewer;
