const express = require("express");
const recoverPublicKey = require("./scripts/recoverPubKey")

const app = express();
const cors = require("cors");
const port = 3042;
app.use(cors());
app.use(express.json());

const balances = {
  "04b829fa1bd45f6edec5ce134e080a252d9f7ee0c86f5bd2bbf7b5cf1bdc6b68a272560fff7d16139f94c58087d73b3dcd588384f61e07d52b1047a79d8b0b9acd": 100,
  "04d3a1d366822d32682b4199026faf78a735d955769a368f24c916efcce0f359f190c64b53b3e1c0bbc31daf340bae465f2675b8f81a11fb429ca3bf3f8bc68e91": 50,
  "04a077234480489ff077e72f877d9c1a473c3d6f0bedcfb6fd65449e1cc2e01d3dadbfb293f4def7bf3034dca9c8d2b49c083f607b7d48ccb1d82435489372486a": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  let addr = JSON.parse(address)
  let pubk = recoverPublicKey(addr.address, addr.recoveryBit)

  const balance = balances[pubk] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender: { address, recoveryBit }, recipient, amount } = req.body;
  let pubk = recoverPublicKey(address, recoveryBit)

  setInitialBalance(pubk);
  setInitialBalance(recipient);

  if (balances[pubk] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[pubk] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[pubk] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
