import server from "./server";
import {toHex} from 'ethereum-cryptography/utils'
import { sign } from "./sign";
 
function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey, msg }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);

    const [signature, recoveryBit] = await sign(msg,privateKey)
    const address = toHex(signature)
   
    setAddress(address)

    if (address) {
      let dt = JSON.stringify({address,recoveryBit})
      const {
        data: { balance },
      } = await server.get(`balance/${dt}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <div className="warning">Note: Never share your private key with any web3 site! This is for educational purposes only, to demonstrate public key cryptography.</div>
      <label>
        Private Key
        <input placeholder="Type a private key, for example: b3ba..." value={privateKey} onChange={onChange}></input>
      </label>
      <div>
        Address:{address.slice(0,10)}...
      </div>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
