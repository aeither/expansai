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
      <MainButton
        text="More"
        onClick={() => WebApp.openLink("https://space.id")}
      />
      {/* <BackButton onClick={() => alert("back")} /> */}

      <div className="banner">
        <img
          className="rounded-md"
          src="expansai_tg_logo.png"
          alt="App Banner"
        />
      </div>
      <div>
        <div className="py-4">
          <h2 className="text-2xl font-bold pb-2">AI Domain Names</h2>
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
                    className="bg-orange-400 w-10 rounded-md"
                  >
                    🔍
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
