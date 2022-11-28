const secp = require("ethereum-cryptography/secp256k1")
const {keccak256} = require("ethereum-cryptography/keccak")
const {utf8ToBytes,toHex} = require("ethereum-cryptography/utils")

const msg = "hello"

function recoverPublicKey(address, recoveryBit){
    let msgBytes = utf8ToBytes(msg)
    let hashed = keccak256(msgBytes)

    return toHex(secp.recoverPublicKey(hashed, address, recoveryBit))
}
module.exports = recoverPublicKey