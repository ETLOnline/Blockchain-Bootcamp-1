// Check if MetaMask is installed
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
} else {
    alert("Please install MetaMask to use this feature.");
}

let accounts = [];

async function connectWallet() {
    try {
        // Request access to the user's MetaMask accounts
        accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Display the first connected account address
        document.getElementById("walletAddress").textContent = accounts[0];

    } catch (error) {
        console.error("Error connecting wallet:", error);
        // Display error message to the user
    }
}

async function sendETH() {
    const recipientAddress = document.getElementById("recipientAddress").value;
    const ethAmount = document.getElementById("ethAmount").value;

    try {
        // Request access to the user's MetaMask accounts
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Create an ethers.js provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // Get the signer (the user's connected account)
        const signer = provider.getSigner();

        // Create a transaction object
        const tx = {
            to: recipientAddress,
            value: ethers.utils.parseEther(ethAmount) // Convert ETH amount to Wei
        };

        // Send the transaction
        const transaction = await signer.sendTransaction(tx);
        console.log("Transaction hash:", transaction.hash);
        // You can add more UI feedback here (e.g., success message)
    } catch (error) {
        console.error("Error sending ETH:", error);
        // Display error message to the user
    }
}

async function sendETHWithSignature() {
    const recipientAddress = document.getElementById("recipientAddress").value;
    const ethAmount = document.getElementById("ethAmount").value;   
    const ethSignature = document.getElementById("ethSig").value;

    try {
        // Create an ethers.js provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // Get the signer (the user's connected account)
        const signer = provider.getSigner();

        // Message to be signed (you can customize this)
        const message = `Authorizing with signature - ${ethSignature}`;

        // Request the user's signature
        const signature = await signer.signMessage(message);
        console.log("Signature:", signature);

        // You can now send the signature to your backend for verification 
        // (along with recipientAddress and ethAmount)

        // ... (Optional: You can also create and send the transaction here after signature verification on the backend) ...

        // For now, let's just display a success message (assuming backend verification is successful)
        alert("ETH transfer request sent with signature! Awaiting backend verification.");

    } catch (error) {
        console.error("Error sending ETH:", error);
        // Display error message to the user
    }
}