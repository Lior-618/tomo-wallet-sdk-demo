import "@tomo-inc/tomo-web-sdk/style.css";

import { getDefaultConfig, TomoEVMKitProvider, useConnectModal } from "@tomo-inc/tomo-evm-kit";
import { WagmiProvider, useAccount } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { WebWalletInvokeType } from "@tomo-inc/shared-type";

const ConnectButton = () => {
  const { openConnectModal } = useConnectModal();

  return (
    <button onClick={openConnectModal}>
      Connect Wallet
    </button>
  );
};


const OrderComponent = () => {

  const { connector } = useAccount();

  const handleAction = async (type: WebWalletInvokeType) => {
    const provider = (await connector?.getProvider());
    const tomoSDK = provider?.core;
    try {
      tomoSDK?.handleWebWalletInvoke(type);
    } catch (e) {
      console.log("handleAction error:", e);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h1>EVMKit Demo</h1>
      <button onClick={() => handleAction(WebWalletInvokeType.ONRAMP)}>
        Onramp
      </button>
      <button onClick={() => handleAction(WebWalletInvokeType.SWAP)}>
        Swap
      </button>
      <button onClick={() => handleAction(WebWalletInvokeType.SEND)}>
        Send
      </button>
      <button onClick={() => handleAction(WebWalletInvokeType.RECEIVE)}>
        Receive
      </button>
      <button
        onClick={() => handleAction(WebWalletInvokeType.CHANGE_PAY_PIN)}
      >
        Change Pay Pin
      </button>
    </div>
  );
};

export default function EVMKitPage() {
  const config = getDefaultConfig({
    clientId:
      "your-client-id", // Replace with your clientId
    appName: "My TomoEVMKit App",
    projectId: "YOUR_PROJECT_ID", // Note: Every dApp that relies on WalletConnect now needs to obtain a projectId from WalletConnect Cloud.
    chains: [mainnet, polygon, optimism, arbitrum, base],
    ssr: true, // If your dApp uses server-side rendering (SSR)
  });


  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <TomoEVMKitProvider>
          <ConnectButton />
          <OrderComponent />
        </TomoEVMKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
