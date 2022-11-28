import { utf8ToBytes } from "ethereum-cryptography/utils";
import {keccak256} from "ethereum-cryptography/keccak"
import * as secp from "ethereum-cryptography/secp256k1"

async function sign(msg, privKey){
  let msgBytes = utf8ToBytes(msg)
  let hashed = keccak256(msgBytes)
  let signed = await secp.sign(hashed, privKey,{recovered:true})

  return signed
}

export {sign}