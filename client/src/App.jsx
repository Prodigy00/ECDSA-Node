import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  /**using private key approach for project. 
   * Note: do not do this for real projects! Private keys should never be requested/shared, only signatures.
  **/
 const [privateKey, setPrivateKey] = useState("")
 const [msg, setMsg] = useState("hello")
  return (
    <div className="app">
      <Wallet
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        msg={msg}
      />
      <Transfer setBalance={setBalance} address={address} msg={msg} privateKey={privateKey} />
    </div>
  );
}

export default App;
