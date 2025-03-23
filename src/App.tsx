import { RpgGame } from "@rpgjs/client/react";
import { RpgClientEngine } from "@rpgjs/client";
import { Components, RpgServerEngine } from "@rpgjs/server";
import { SignupPage } from "./pages/signup.js";
import { Web3Wrapper } from "./web3/index.js";
import { useStore } from "@nanostores/react";
import { isConnected } from "./store/auth.js";
import { useAccount } from "wagmi";

function GameComponent() {
  const { address } = useAccount();

  const onReady = ({
    server,
    client,
  }: {
    server: RpgServerEngine;
    client: RpgClientEngine;
  }) => {
    console.log(server, client);
    console.log("ADDRESS", address);
    
  };

  return (
    <>
      {address && <RpgGame onReady={onReady} />}
      {!address && <SignupPage />}
    </>
  );
}

function App() {
  const $isConnected = useStore(isConnected);

  return (
    <>
      <Web3Wrapper>
        <GameComponent />
        {/* {
          $isConnected ? (
            <GameComponent />
          ) : <SignupPage />
        } */}
      </Web3Wrapper>
    </>
  );
}

export default App;
