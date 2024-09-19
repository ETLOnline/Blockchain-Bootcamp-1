const abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "donor",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "DonationReceived",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "donate",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address payable",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

async function makeDonation() {
    const contractAddress = "0xAc3Df609F405834729Ea898bEE19d9D2503F7a92";
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);    
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    
    
    // Get the donation amount from the input
    const donationAmount = ethers.utils.parseEther("0.002");

    // Call the donate function with the specified amount
    const tx = await contract.donate({ value: donationAmount });

    // Wait for the transaction to be mined
    await tx.wait();
    
    //console.log("Balance:", ethers.utils.formatUnits(balance, 18)); // Assuming 18 decimals
}

async function checkBalance() {
    const contractAddress = "0xAc3Df609F405834729Ea898bEE19d9D2503F7a92";
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    const contract = new ethers.Contract(contractAddress, abi, provider);
    
    const balance = await contract.getBalance();
    
    console.log("Balance:", ethers.utils.formatUnits(balance, 18)); // Assuming 18 decimals
}