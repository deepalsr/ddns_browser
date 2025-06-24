export const contractAddress = "0x3Fe0c0E465A93E048af20A4CD58230EEf4d14Bbd";

export const abi = [
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "string", "name": "name", "type": "string" },
      { "indexed": false, "internalType": "string", "name": "newCid", "type": "string" }
    ],
    "name": "CIDUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "string", "name": "name", "type": "string" },
      { "indexed": true, "internalType": "address", "name": "owner", "type": "address" },
      { "indexed": false, "internalType": "string", "name": "cid", "type": "string" }
    ],
    "name": "DomainRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "string", "name": "name", "type": "string" },
      { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }
    ],
    "name": "DomainTransferred",
    "type": "event"
  },
  {
    "inputs": [{ "internalType": "string", "name": "name", "type": "string" }],
    "name": "getCID",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "string", "name": "name", "type": "string" }],
    "name": "getOwner",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "string", "name": "cid", "type": "string" }
    ],
    "name": "registerDomain",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "address", "name": "newOwner", "type": "address" }
    ],
    "name": "transferDomain",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "string", "name": "newCid", "type": "string" }
    ],
    "name": "updateCID",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
