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
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "donations",
        "outputs": [
            {
                "internalType": "address",
                "name": "donor",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
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
    const contractAddress = "0xFB5271cC736d130Eda93B9BEB7871fa939f40075";
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);    
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    
    
    // Get the donation amount from the input
    const donationAmount = ethers.utils.parseEther("0.001");

    // Call the donate function with the specified amount
    const tx = await contract.donate({ value: donationAmount });


    // Wait for the transaction to be mined
    await tx.wait();
    
    //console.log("Balance:", ethers.utils.formatUnits(balance, 18)); // Assuming 18 decimals
}

async function checkBalance() {
    const contractAddress = "0xFB5271cC736d130Eda93B9BEB7871fa939f40075";
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    const contract = new ethers.Contract(contractAddress, abi, provider);
    
    console.log("calling balance");
    const balance = await contract.getBalance();
    console.log(balance);
    
    console.log("Balance:", ethers.utils.formatUnits(balance, 18)); // Assuming 18 decimals
    console.log("balance fetched");
}

