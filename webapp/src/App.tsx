import {
  Cell,
  ImageAvatar,
  InitialsAvatar,
  Page,
  Section,
  Switch,
} from "@twa-dev/mark42";
import WebApp from "@twa-dev/sdk";
import { MainButton } from "@twa-dev/sdk/react";
import { useEffect, useState } from "react";
import "./App.css";
import { User } from "./schema";

if (!import.meta.env.VITE_BACKEND_URL)
  throw new Error("VITE_BACKEND_URL not found");
let backendURL: string;

if (import.meta.env.DEV) {
  // Running locally, use localhost
  backendURL = "http://localhost:8080"; // Change the port as needed
} else {
  // Deployed, use the deployed URL
  backendURL = import.meta.env.VITE_BACKEND_URL;
}
// // 1. Get projectId∏
// if (!import.meta.env.VITE_PROJECT_ID)
//   throw new Error("VITE_PROJECT_ID not found");
// const projectId = import.meta.env.VITE_PROJECT_ID;

// // 2. Create wagmiConfig
// const chains = [mainnet, arbitrum];
// const wagmiConfig = defaultWagmiConfig({
//   chains,
//   projectId,
//   appName: "Expansai",
// });

// // 3. Create modal
// createWeb3Modal({ wagmiConfig, projectId, chains });

WebApp.ready();

function App() {
  const [count, setCount] = useState(0);
  const [suggestions, setSuggestions] = useState<User[]>([]);

  // const { open } = useWeb3Modal();

  const action1 = async () => {
    WebApp.HapticFeedback.impactOccurred("light");
  };
  const action2 = async () => {
    WebApp.CloudStorage.setItem("test", Math.random().toFixed(2));
  };

  const action3 = async () => {
    WebApp.CloudStorage.getItem("test", (_, result) => console.log(result));
  };

  // async function resolveBnb(name: string) {
  //   let sid;
  //   const rpc = "https://data-seed-prebsc-1-s1.binance.org:8545/";
  //   const provider = new providers.JsonRpcProvider(rpc);
  //   sid = new SID({ provider, sidAddress: SIDfunctions.getSidAddress("97") });
  //   const address = await sid.name(name).getAddress(); // 0x123
  //   console.log("name: %s, address: %s", name, address);
  // }

  async function resolveBnb2(name: string) {
    const response = await fetch(`${backendURL}/${name}`);
    console.log("🚀 ~ file: App.tsx:60 ~ resolveBnb2 ~ response:", response);
    const data = await response.text();
    console.log("🚀 ~ file: App.tsx:70 ~ resolveBnb ~ data:", data);

    WebApp.showAlert("resolved");
  }

  const getSuggestions = async () => {
    try {
      const response = await fetch(backendURL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSuggestions(data); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getSuggestions(); // Call the fetch function when the component mounts
  }, []); // The empty dependency array ensures this effect runs once when the component mounts

  return (
    <>
      <div>
        <button onClick={() => getSuggestions()}>getSuggestions</button>
        <div>
          <h1>Suggestions</h1>
          <ul>
            {suggestions.map((suggestion) => (
              <li key={suggestion.id}>
                {suggestion.name} - {suggestion.role}
              </li>
            ))}
          </ul>
        </div>

        <button onClick={() => resolveBnb2("felix.bnb")}>resolveBnb2</button>

        <button onClick={() => WebApp.expand()}>Expand</button>
        <button
          onClick={() => {
            WebApp.initData;
            console.log(
              "🚀 ~ file: App.tsx:63 ~ App ~ ebApp.initData:",
              WebApp.initData
            );
          }}
        >
          initData
        </button>
        <button onClick={() => WebApp.showScanQrPopup({ text: "hello" })}>
          showScanQrPopup
        </button>
        <button onClick={() => WebApp.switchInlineQuery("switch to inline")}>
          switchInlineQuery
        </button>

        <MainButton text="Close" onClick={() => WebApp.close()} />
        {/* <BackButton onClick={() => alert("back")} /> */}
        <Page mode="secondary">
          <Section
            description="Share your contacts with the community. It will help other members to reach you faster."
            header="Public contacts"
          >
            <Cell after={<Switch />} description="@Stambultsian">
              Twitter
            </Cell>
            <Cell after={<Switch />} description="@artursupertramp">
              Facebook
            </Cell>
            <Cell after={<Switch checked />} description="@ArthurStam">
              Telegram
            </Cell>
          </Section>
        </Page>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button type="button" onClick={() => WebApp.showAlert("Hey there!")}>
          click
        </button>
        <button type="button" onClick={action1}>
          click1
        </button>
        <button type="button" onClick={action2}>
          click2
        </button>
        <button type="button" onClick={action3}>
          click3
        </button>

        <InitialsAvatar
          entityId={12345}
          entityName="Artur Stambultsian"
          theme="apple"
          className="MyAvatar"
          style={{ marginRight: 10 }}
        />

        <ImageAvatar
          size={100}
          src="https://cdn4.telegram-cdn.org/file/GSG98YPeYhPH42R0BlvQT7di6ha48LJI4lZwbQ7q7f_TYAC5FwRrEBTlyaVij-ylfflg4aU0R8AtL8UZmG9R6sX0S12R_zLTuEUlaV99qXZm_OcaFqdknYCbxb7-XuVCy7c7mPaWagdFuF_T2-fopi1dzsrvW6E6ff8qFhQqIrrvtBdq7jO5829aCEpSIHi9QqFuw6l1WuOWfoq1LjjV7kq2wSfo_uOlN4PP-hFPAL1wklwnTw4NPE-Mfu9gFd472JUN9e299UP2f2jeZnvst2qX0Go6fb81gewClahABP-veeqGrVBxVphfixV3KJulKdt0CCU7KhFM7e-Gd4-qug.jpg"
        />
      </div>
    </>
  );
}

export default App;
