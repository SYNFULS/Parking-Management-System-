function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'admin') {
        window.location.href = 'parking-lots.html';
    } else {
        alert('Invalid username or password');
    }
}


const parkingLots = [
    { id: 1, name: 'Lot 1', location: 'Location 1' },
    { id: 2, name: 'Lot 2', location: 'Location 2' },
    // Add more parking lots as needed
];

window.onload = function() {
    const parkingLotsDropdown = document.getElementById('parking-lots');
    parkingLots.forEach(lot => {
        const option = document.createElement('option');
        option.value = lot.id;
        option.textContent = lot.name;
        parkingLotsDropdown.appendChild(option);
    });
};

function showParkingLot() {
    const selectedLotId = document.getElementById('parking-lots').value;
    if (selectedLotId) {
        window.location.href = `parking-lot.html?id=${selectedLotId}`;
    }
}

function getParkingLotDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const lotId = urlParams.get('id');
    const lot = parkingLots.find(lot => lot.id == lotId);
    
    if (lot) {
        document.getElementById('lot-name').textContent = lot.name;
        // Fetch and display slots for the selected parking lot
    }
}

function vehicleEntry() {
    window.location.href = 'vehicle-entry.html';
}

getParkingLotDetails();

function addVehicleEntry() {
    const licensePlate = document.getElementById('license-plate').value;
    const ownerName = document.getElementById('owner-name').value;
    const ownerContact = document.getElementById('owner-contact').value;
    const vehicleType = document.getElementById('vehicle-type').value;

    // Add vehicle entry logic here
    // After adding, redirect to a confirmation page or back to the parking lot details
    alert('Vehicle entry added successfully!');
    window.location.href = 'parking-lot.html';
}
function fetchAmount() {
    const vehicleId = document.getElementById('vehicle-id').value;

    // Fetch exit time and calculate amount logic here
    // Example calculation
    const exitTime = new Date();
    const entryTime = new Date(exitTime.getTime() - 2 * 60 * 60 * 1000); // 2 hours ago
    const duration = (exitTime - entryTime) / (1000 * 60 * 60); // duration in hours
    const hourlyRate = 5.0; // Fetch this from the vehicle's data
    const amount = duration * hourlyRate;

    document.getElementById('amount').textContent = `Amount: $${amount.toFixed(2)}`;
}
