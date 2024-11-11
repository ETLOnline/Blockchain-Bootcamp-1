const contractAddress = "0xcA9BaEEf0A5F64A2998501f35115E2c95527fcC0"; // Replace with your contract address
const contractABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_manufacturer",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_distributor",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_hospital",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "batchId",
                "type": "uint256"
            },
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    },
                    {
                        "internalType": "int256",
                        "name": "lat",
                        "type": "int256"
                    },
                    {
                        "internalType": "int256",
                        "name": "long",
                        "type": "int256"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    }
                ],
                "indexed": false,
                "internalType": "struct VaccineSupplyChain.LocationData",
                "name": "location",
                "type": "tuple"
            }
        ],
        "name": "LocationRecorded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "batchId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "int256",
                "name": "count",
                "type": "int256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "manufacturer",
                "type": "address"
            }
        ],
        "name": "VaccineBatchCreated",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_batchId",
                "type": "uint256"
            },
            {
                "internalType": "int256",
                "name": "_count",
                "type": "int256"
            },
            {
                "internalType": "string",
                "name": "_details",
                "type": "string"
            }
        ],
        "name": "createVaccineBatch",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "distributor",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_batchId",
                "type": "uint256"
            }
        ],
        "name": "getLocationHistory",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    },
                    {
                        "internalType": "int256",
                        "name": "lat",
                        "type": "int256"
                    },
                    {
                        "internalType": "int256",
                        "name": "long",
                        "type": "int256"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    }
                ],
                "internalType": "struct VaccineSupplyChain.LocationData[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "hospital",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "locationHistory",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "internalType": "int256",
                "name": "lat",
                "type": "int256"
            },
            {
                "internalType": "int256",
                "name": "long",
                "type": "int256"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "manufacturer",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_batchId",
                "type": "uint256"
            },
            {
                "internalType": "int256",
                "name": "_lat",
                "type": "int256"
            },
            {
                "internalType": "int256",
                "name": "_long",
                "type": "int256"
            },
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            }
        ],
        "name": "recordLocationData",
        "outputs": [],
        "stateMutability": "nonpayable",
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
        "name": "vaccineBatches",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "batchId",
                "type": "uint256"
            },
            {
                "internalType": "int256",
                "name": "count",
                "type": "int256"
            },
            {
                "internalType": "string",
                "name": "details",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
connectWallet();

async function createVaccineBatch() {
    const batchId = document.getElementById("batchId").value;
    const vaccineCount = document.getElementById("vaccineCount").value;
    const desc = document.getElementById("desc").value; 

    if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();   

    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
        const tx = await contract.createVaccineBatch(batchId, vaccineCount, desc);
        await tx.wait();
        console.log("Transaction completed:", tx.hash);
        // Optionally, display a success message or redirect to another view
    } catch (error) {
        console.error("Error creating batch:", error);
        alert(error.message);
        // Display an error message to the user
    }
    } else {
    alert("Please install MetaMask to use this application.");
    }
}

async function updateVaccineLocation() {
    const batchId = document.getElementById("batchIdLocation").value;
    const lat = document.getElementById("latitude").value;
    const long = document.getElementById("longitude").value; 
    const locName = document.getElementById("locationName").value;

    if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();   

    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
        const tx = await contract.recordLocationData(batchId, lat, long, locName);
        await tx.wait();
        console.log("Transaction completed:", tx.hash);
        // Optionally, display a success message or redirect to another view
    } catch (error) {
        console.error("Error creating batch:", error);
        alert(error.message);
        // Display an error message to the user
    }
    } else {
    alert("Please install MetaMask to use this application.");
    }
}

// Hospital Functions
async function showOnMap() {
    const batchId = document.getElementById("batchIdMap").value;

    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      
      
      try {
        locationHistory = await contract.getLocationHistory(batchId);        
        locationHistory.forEach((location) => {
            console.log(location);            
        });
        initMap(locationHistory); // Initialize the map with location data
      } catch (error) {
        console.error("Error fetching location history:", error);
        // ... (Display error message) ...
      }
    } else {
      // ... (MetaMask not found alert) ...
    }

  }

  function initMap(locationHistory) {
    // // Initialize the map
    // const map = L.map('map').setView([42.37856108498607, -71.23749529922384], 13); // Centered on New York City

    // // Add the OpenStreetMap tile layer
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>contributors'
    // }).addTo(map);
    
    // let locations = [];

    // locationHistory.forEach((location) => {
    //     locations.push({lat: location.lat / 1000000, lng: location.long / 1000000, title: location.name})        
    // });

    // // Add markers for each location
    // locations.forEach(location => {
    //     alert(location.title);
    //   L.marker([location.lat, location.lng]).addTo(map)
    //     .bindPopup(location.title); // Add a popup with the title
    // });
    
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 3, // Start with a zoomed-out view
      center: { lat: 0, lng: 0 }, // Center on the world initially
    });
    // locationHistory = [
    //     {lat: 42.37298069397152, long: -71.25486525334289, title: 'one'},
    //     {lat: 42.374233017429475, long: -71.2470224741801, title: 'two'},
    //     {lat: 42.37596879156187, long: -71.24873908795034, title: 'three'}
    // ];
    const bounds = new google.maps.LatLngBounds();
    locationHistory.forEach((location) => {
        console.log(location.lat.toNumber() / 1000000);
        console.log(location.long.toNumber() / 1000000);
      const position = { lat: location.lat / 1000000, lng: location.long / 1000000 };
      //const position = { lat: location.lat, lng: location.long};
      new google.maps.Marker({
        position: position,
        map: map,
        title: location.titile,
        //title: `Time: ${new Date(location.timestamp * 1000)}`,
      });
      bounds.extend(position);
    });
    map.fitBounds(bounds); // Adjust the map to fit all markers
  }