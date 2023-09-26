import {
  Cell,
  ImageAvatar,
  InitialsAvatar,
  Page,
  Section,
  Switch,
} from "@twa-dev/mark42";
import WebApp from "@twa-dev/sdk";
import { BackButton, MainButton } from "@twa-dev/sdk/react";
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
  const [status, setStatus] = useState("");
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

  async function resolveBnb(name: string) {
    const response = await fetch(`${backendURL}/${name}`);
    const data = await response.text();
    console.log(data);
    if (data === "0x0000000000000000000000000000000000000000") {
      console.log("The domain is available!!!");
      WebApp.showAlert("The domain is available!!!");
    } else {
      console.log(`The domain is taken by ${data}`);
      WebApp.showAlert(`The domain is taken by ${data}`);
    }
  }

  const getSuggestions = async () => {
    try {
      // const response = await fetch(backendURL);
      // if (!response.ok) {
      //   throw new Error("Network response was not ok");
      // }
      // const data = await response.json();

      const data = [
        {
          id: 2,
          name: "luigi",
          role: null,
          createdAt: 0,
          updatedAt: 0,
        },
        {
          id: 3,
          name: null,
          role: null,
          createdAt: null,
          updatedAt: null,
        },
        {
          id: 4,
          name: "fitnessescape.bnb",
          role: "bnb",
          createdAt: 0,
          updatedAt: 0,
        },
        {
          id: 5,
          name: "workoutwave.bnb",
          role: "bnb",
          createdAt: 0,
          updatedAt: 0,
        },
      ];
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
      <div className="banner">
        <img src="expansai_tg_logo.png" alt="App Banner" />
      </div>
      <div>
        <div className="py-4">
          <h2 className="text-2xl font-bold">AI Domain Names</h2>
          <ul style={{ listStyle: "none", paddingLeft: "0" }}>
            {suggestions
              .slice()
              .reverse()
              .map((suggestion) => (
                <li
                  key={suggestion.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "left",
                    padding: "5px 0",
                  }}
                >
                  <span>{suggestion.name}</span>
                  <span
                    onClick={() => {
                      console.log("looking");
                      // WebApp.showAlert("show");
                      resolveBnb(suggestion.name || "felix.bnb");
                    }}
                    style={{ marginLeft: "auto" }}
                    className="bg-orange-400 w-8 rounded-md"
                  >
                    🔍
                  </span>
                </li>
              ))}
          </ul>
        </div>

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
