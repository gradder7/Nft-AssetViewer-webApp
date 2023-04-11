// import { useNavigate, Link } from "react-router-dom";
// import { useAccount } from "wagmi";
// import { ClipboardIcon } from "@heroicons/react/outline";
// import ProfileImage from "../utils/profileImages";

// const Nav = () => {
//   const [{ data: accountData }, disconnect] = useAccount();
//   const navigate = useNavigate();
//   return (
//     <div className="top-0 z-30 w-full sticky flex-grow flex bg-white shadow-xl shadow-black-600/20  justify-end mr-12 -mb-20 sm:px-4 px-2">
//       {/* <div className="sticky top-0 z-30 w-full py-0 bg-white shadow-xl shadow-black-600/20 sm:px-4 px-2"> */}
//       {accountData ? (
//         <div className="flex items-center">
//           <div className="flex mr-4 text-black gap-4">
//             <Link className="mr-2 " to="/explore">
//               Explore
//             </Link>
//             <Link className="mr-2 " to="/asserViewer">
//               AssetViewer
//             </Link>

//             <div className="flex items-center">
//               <p className="">{`${[...accountData.address]
//                 .splice(0, 6)
//                 .join("")}...${[...accountData.address]
//                 .splice(37)
//                 .join("")}`}</p>
//               <ClipboardIcon
//                 onClick={() =>
//                   navigator.clipboard.writeText(accountData.address)
//                 }
//                 className="h-4 w-4 -mt-2 text-slate-200 cursor-pointer"
//               ></ClipboardIcon>
//             </div>
//           </div>
//           <button
//             className=" text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-6 mb-2"
//             onClick={() => {
//               disconnect();
//               navigate("/login");
//             }}
//           >
//             Disconnect
//           </button>
//           <div></div>
//           <Link to="/">
//             {" "}
//             <ProfileImage width={"63"} rounded={true} />
//           </Link>
//         </div>
//       ) : (
//         <Link className=" py-2 px-4 rounded-lg bg-red" to={"/login"}>
//           Connect
//         </Link>
//       )}
//     </div>
//   );
// };

// export default Nav;
import { useNavigate, Link } from "react-router-dom";
import { useAccount } from "wagmi";
import { ClipboardIcon } from "@heroicons/react/outline";
import ProfileImage from "../utils/profileImages";

const Nav = () => {
  const [{ data: accountData }, disconnect] = useAccount();
  console.log('data=>',accountData);
  console.log('data2=>',disconnect);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await disconnect();
    navigate("/login");
  };

  return (
    <div className="top-0 z-30 w-full sticky flex-grow flex bg-white shadow-xl shadow-black-600/20  justify-end mr-12 -mb-20 sm:px-4 px-2">
      {accountData ? (
        <div className="flex items-center">
          <div className="flex mr-4 text-black gap-4">
            <Link className="mr-2 " to="/explore">
              Explore
            </Link>

            <div className="flex items-center">
              <p className="">{`${[...accountData.address]
                .splice(0, 6)
                .join("")}...${[...accountData.address]
                .splice(37)
                .join("")}`}</p>
              <ClipboardIcon
                onClick={() =>
                  navigator.clipboard.writeText(accountData.address)
                }
                className="h-4 w-4 -mt-2 text-slate-200 cursor-pointer"
              ></ClipboardIcon>
            </div>
          </div>
          <button
            className=" text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-6 mb-2"
            onClick={handleLogout}
          >
            Disconnect
          </button>
          <div></div>
          <Link to="/">
            <ProfileImage width={"63"} rounded={true} />
          </Link>
        </div>
      ) : (
        <Link className="py-2 px-4 rounded-lg bg-red" to={"/login"}>
          Connect
        </Link>
      )}
    </div>
  );
};

export default Nav;

