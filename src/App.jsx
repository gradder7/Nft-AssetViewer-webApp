import { Provider, defaultChains } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import Nav from "./components/nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";
import Explore from "./explore";
import Login from "./login";
import MyProfile from "./myprofile";
import AssetViewer from "./components/assetViewer";

function App() {
  // initialize wagmi library connectors for Metamask and Walletconnect

  const connectors = () => {
    return [new InjectedConnector({ defaultChains })];
  };

  return (
    <BrowserRouter>
      <Provider autoConnect connectors={connectors}>
        <Nav></Nav>
        <Routes>
          <Route path="/" element={<MyProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/asserViewer" element={<AssetViewer />} />
        </Routes>
        <ToastContainer />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
