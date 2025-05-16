import "@tomo-inc/tomo-web-sdk/style.css";
import { TomoContextProvider, useTomo } from "@tomo-inc/tomo-web-sdk";
import { WebWalletInvokeType } from "@tomo-inc/shared-type";

const OrderComponent = () => {

  const { openConnectModal, connected, tomoSDK } = useTomo();

  const handleAction = async (type: WebWalletInvokeType) => {
    tomoSDK?.handleWebWalletInvoke(type);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h1>WebSDK Demo</h1>
      <button disabled={connected} onClick={() => openConnectModal()}>Connect Wallet</button>
      <button disabled={!connected} onClick={() => handleAction(WebWalletInvokeType.ONRAMP)}>Onramp</button>
      <button disabled={!connected} onClick={() => handleAction(WebWalletInvokeType.SWAP)}>Swap</button>
      <button disabled={!connected} onClick={() => handleAction(WebWalletInvokeType.SEND)}>Send</button>
      <button disabled={!connected} onClick={() => handleAction(WebWalletInvokeType.RECEIVE)}>Receive</button>
      <button disabled={!connected} onClick={() => handleAction(WebWalletInvokeType.CHANGE_PAY_PIN)}>Change Pay Pin</button>
    </div>
  );
};

export default function WebSDKPage() {

  return (
    <TomoContextProvider
      theme="light"
      chainTypes={["sui"]}
      clientId="your-client-id"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Add your page content here */}
        <OrderComponent />
      </div>
    </TomoContextProvider>
  );
}
