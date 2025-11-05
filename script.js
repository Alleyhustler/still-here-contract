document.addEventListener('DOMContentLoaded', () => {
    const connectWalletButton = document.getElementById('connectWallet');
    const floorLevelDisplay = document.getElementById('floorLevel');
    const currentPriceDisplay = document.getElementById('currentPrice');
    const statusLineDisplay = document.getElementById('statusLine');
    const snapshotEventDisplay = document.getElementById('snapshotEvent');
    const loyalHoldersList = document.getElementById('loyalHoldersList');
    const cowardsList = document.getElementById('cowardsList');
    const lastUpdateDisplay = document.getElementById('lastUpdate');
    const body = document.body;

    const FLOOR_THRESHOLD = 0.14; // Static floor level for the contract
    let currentPrice = 0.21;
    let isSnapshotTriggered = localStorage.getItem('isSnapshotTriggered') === 'true';
    let myWalletAddress = localStorage.getItem('myWalletAddress') || null;

    // Simulate wallet addresses (more realistic look with fixed length)
    const generateWalletAddress = () => {
        const hexChars = '0123456789ABCDEF';
        let address = '0x';
        for (let i = 0; i < 4; i++) address += hexChars[Math.floor(Math.random() * 16)];
        address += '...';
        for (let i = 0; i < 4; i++) address += hexChars[Math.floor(Math.random() * 16)];
        return address;
    };

    // Initial dummy data for holders, load from localStorage if available
    let holders = JSON.parse(localStorage.getItem('holders')) || [
        { address: generateWalletAddress(), status: 'LOYAL' },
        { address: generateWalletAddress(), status: 'LOYAL' },
        { address: generateWalletAddress(), status: 'LOYAL' },
        { address: generateWalletAddress(), status: 'COWARD' },
        { address: generateWalletAddress(), status: 'LOYAL' },
        { address: generateWalletAddress(), status: 'COWARD' },
        { address: generateWalletAddress(), status: 'LOYAL' },
        { address: generateWalletAddress(), status: 'LOYAL' },
        { address: generateWalletAddress(), status: 'COWARD' },
    ];

    // Function to update the last update timestamp
    const updateLastUpdateTime = () => {
        const now = new Date();
        const timeString = now.toLocaleTimeString();