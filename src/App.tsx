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
import { useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

import { WagmiConfig } from "wagmi";
import { arbitrum, mainnet } from "wagmi/chains";

import { useWeb3Modal } from "@web3modal/wagmi/react";

// 1. Get projectId
const projectId = "ceddf10b20007fb16748271c44f7f7d4";

// 2. Create wagmiConfig
const chains = [mainnet, arbitrum];
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  appName: "Web3Modal",
});

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains });

WebApp.ready();

function App() {
  const [count, setCount] = useState(0);

  const { open } = useWeb3Modal();

  const action1 = async () => {
    WebApp.HapticFeedback.impactOccurred("light");
  };
  const action2 = async () => {
    WebApp.CloudStorage.setItem("test", Math.random().toFixed(2));
  };

  const action3 = async () => {
    WebApp.CloudStorage.getItem("test", (_, result) => console.log(result));
  };

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <MainButton text="Submit" onClick={() => alert("submitted")} />
          <BackButton onClick={() => alert("back")} />
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
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
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

          <button onClick={() => open()}>Open Connect Modal</button>
          <button onClick={() => open({ view: "Networks" })}>
            Open Network Modal
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
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </WagmiConfig>
    </>
  );
}

export default App;
