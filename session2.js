async function signData() {
    // Assuming you have a provider connected to your Ethereum network
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // Get the signer (user's account)
    const signer = await provider.getSigner();
    console.log(signer);

    // const data = { from: 'toseer' };
    // const jsonData = JSON.stringify(data);
    // console.log(jsonData);

    const message = "This is Blockchain Bootcamp Session 2";
    // Hash the data
    //const messageHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(jsonData));
    //console.log(messageHash)

    // Sign the hash
    const signature = await signer.signMessage(message); 
    console.log("Signature:", signature);

    // Now you have the `signature` and `messageHash` that you can send to your smart contract for verification
}
