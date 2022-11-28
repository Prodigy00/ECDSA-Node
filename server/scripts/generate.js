const secp = require("ethereum-cryptography/secp256k1")
const {toHex} = require("ethereum-cryptography/utils") 

//not to be done in a prod environment! (for tutorial purposes). signatures only not private keys
const privateKey = secp.utils.randomPrivateKey()



const publicKey = secp.getPublicKey(privateKey)

