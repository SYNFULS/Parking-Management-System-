document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('auth-form');
    const authErrorMessage = document.getElementById('auth-error');
    const parkingLotSelect = document.getElementById('parking-lot-select');
    const selectLotButton = document.getElementById('select-lot-button');
    const slotsContainer = document.getElementById('slots-container');
    const entryButton = document.getElementById('entry-button');
    const entryForm = document.getElementById('entry-form');
    const exitForm = document.getElementById('exit-form');
    const amountDisplay = document.getElementById('amount-display');

    let currentUser = null;

<<<<<<< HEAD
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
=======
    // Static user credentials
    document.addEventListener('DOMContentLoaded', () => {
        const authForm = document.getElementById('auth-form');
        const authErrorMessage = document.getElementById('auth-error');
    
        // Static user credentials
        const users = [
            { username: 'admin', password: 'admin' },
            { username: 'user', password: 'user' }
        ];
    
        // Function to authenticate user
        function authenticate(username, password) {
            return users.find(user => user.username === username && user.password === password);
        }
    
        // Event listener for authentication form
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = authForm.elements['username'].value;
            const password = authForm.elements['password'].value;
            const authenticatedUser = authenticate(username, password);
    
            if (authenticatedUser) {
                authErrorMessage.style.display = 'none';
                authForm.reset();
                window.location.href = '/parking-lots.html'; // Navigate to the parking lots page
            } else {
                authErrorMessage.style.display = 'block';
            }
        });
    });
    
    // Function to show parking lots page after authentication
    function showParkingLotsPage() {
        authContainer.style.display = 'none';
        document.getElementById('parking-lots').style.display = 'block';
        fetchParkingLots();
      }
      
    // Fetch parking lots and populate select options
    async function fetchParkingLots() {
        try {
            const response = await fetch('/api/parking-lots');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const parkingLots = await response.json();
            const parkingLotSelect = document.getElementById('parking-lot-select');
            parkingLots.forEach(lot => {
                const option = document.createElement('option');
                option.value = lot.parking_lot_id;
                option.textContent = lot.lot_name;
                parkingLotSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching parking lots:', error);
        }
    }
    // Event listener for selecting a parking lot
    selectLotButton.addEventListener('click', () => {
        const selectedLotId = parkingLotSelect.value;
        fetchAvailableSlots(selectedLotId);
    });
>>>>>>> 98cacc25615570e456d045374b77ba3c59f88fe7

    // Fetch available slots for selected parking lot
    async function fetchAvailableSlots(parkingLotId) {
        try {
            const response = await fetch(`/api/available-spaces/${parkingLotId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch available slots');
            }
            const availableSlots = await response.json();
            slotsContainer.innerHTML = '';
            availableSlots.forEach(slot => {
                const div = document.createElement('div');
                div.textContent = `Slot: ${slot.space_number} (Type: ${slot.space_type})`;
                slotsContainer.appendChild(div);
            });
        } catch (error) {
            console.error('Error fetching available slots:', error);
        }
    }

<<<<<<< HEAD
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
=======
    // Event listener for vehicle entry form
    entryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!currentUser) {
            alert('Please log in first.');
            return;
        }
        try {
            const formData = new FormData(entryForm);
            const data = Object.fromEntries(formData.entries());
            const response = await fetch('/api/vehicles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Failed to add vehicle');
            }
            alert('Vehicle entry recorded');
            entryForm.reset();
        } catch (error) {
            console.error('Error adding vehicle:', error);
        }
    });

    // Event listener for vehicle exit form
    exitForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!currentUser) {
            alert('Please log in first.');
            return;
        }
        try {
            const formData = new FormData(exitForm);
            const vehicleId = formData.get('vehicle-id');
            const response = await fetch(`/api/logs/${vehicleId}`, { method: 'PUT' });
            if (!response.ok) {
                throw new Error('Failed to update log');
            }
            const log = await response.json();
            amountDisplay.textContent = `Amount: ${log.amount}`;
            exitForm.reset();
        } catch (error) {
            console.error('Error updating log:', error);
        }
    });
});
>>>>>>> 98cacc25615570e456d045374b77ba3c59f88fe7
