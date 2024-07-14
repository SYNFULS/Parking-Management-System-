function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'admin') {
        window.location.href = 'parking-lots.html';
    } else {
        alert('Invalid username or password');
    }
}

window.onload = function() {
    fetchParkingLots();
};

function fetchParkingLots() {
    fetch('/api/parking-lots')
        .then(response => response.json())
        .then(data => {
            const parkingLotsDropdown = document.getElementById('parking-lots');
            data.forEach(lot => {
                const option = document.createElement('option');
                option.value = lot.id;
                option.textContent = lot.name;
                parkingLotsDropdown.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching parking lots:', error));
}

function showParkingLot() {
    const selectedLotId = document.getElementById('parking-lots').value;
    if (selectedLotId) {
        fetch(`/api/parking-lots/${selectedLotId}`)
            .then(response => response.json())
            .then(data => {
                const lotDetails = document.getElementById('parking-lot-details');
                lotDetails.innerHTML = `
                    <h2>${data.name}</h2>
                    <p>Location: ${data.location}</p>
                `;
                fetchAvailableSpaces(selectedLotId);
            })
            .catch(error => console.error('Error fetching parking lot details:', error));
    }
}

function fetchAvailableSpaces(parkingLotId) {
    fetch(`/api/available-spaces/${parkingLotId}`)
        .then(response => response.json())
        .then(data => {
            const availableSpacesList = document.getElementById('available-spaces');
            availableSpacesList.innerHTML = '';
            data.forEach(space => {
                const listItem = document.createElement('li');
                listItem.textContent = `Space ID: ${space.id}, Status: ${space.status}`;
                availableSpacesList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching available spaces:', error));
}

function vehicleEntry() {
    window.location.href = 'vehicle-entry.html';
}

function addVehicleEntry() {
    const licensePlate = document.getElementById('license-plate').value;
    const ownerName = document.getElementById('owner-name').value;
    const ownerContact = document.getElementById('owner-contact').value;
    const vehicleType = document.getElementById('vehicle-type').value;

    const formData = {
        license_plate: licensePlate,
        owner_name: ownerName,
        owner_contact: ownerContact,
        vehicle_type: vehicleType
    };

    fetch('/api/vehicles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add vehicle entry');
        }
        alert('Vehicle entry added successfully!');
        window.location.href = 'parking-lot.html';
    })
    .catch(error => console.error('Error adding vehicle entry:', error));
}

function fetchAmount() {
    const vehicleId = document.getElementById('vehicle-id').value;

    fetch(`/api/vehicles/${vehicleId}`)
        .then(response => response.json())
        .then(data => {
            // Example calculation (replace with your logic)
            const exitTime = new Date();
            const entryTime = new Date(data.entry_time); // Assuming entry_time is fetched from database
            const duration = (exitTime - entryTime) / (1000 * 60 * 60); // duration in hours
            const hourlyRate = 5.0; // Example hourly rate, replace with actual logic to fetch from database
            const amount = duration * hourlyRate;

            const amountDiv = document.getElementById('amount');
            amountDiv.textContent = `Amount: $${amount.toFixed(2)}`;
        })
        .catch(error => console.error('Error fetching vehicle details:', error));
}
