<<<<<<< Updated upstream
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
=======
const authErrorMessage = document.getElementById('auth-error');
const parkingLotSelect = document.getElementById('parking-lots');
const slotsContainer = document.getElementById('slots-container');
const entryForm = document.getElementById('entry-form');
const exitForm = document.getElementById('exit-form');
const amountDisplay = document.getElementById('amount-display');
const viewParkingLotButton = document.getElementById('view-parking-lot');

let currentUser = null;
let firstAvailableSpaceId = null;

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
if (authForm) {
    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = authForm.elements['username'].value;
        const password = authForm.elements['password'].value;
        const authenticatedUser = authenticate(username, password);

        if (authenticatedUser) {
            authErrorMessage.style.display = 'none';
            authForm.reset();
            currentUser = authenticatedUser; // Set the current user
            window.location.href = './parking-lots.html'; // Navigate to the parking lots page
        } else {
            authErrorMessage.style.display = 'block';
        }
    });
}

// Fetch parking lots and populate select options
async function fetchParkingLots() {
    try {
        const response = await fetch('/api/parking-lots');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const parkingLots = await response.json();
        parkingLotSelect.innerHTML = '<option value="">Select a parking lot</option>'; // Reset options
        parkingLots.forEach(lot => {
            const option = document.createElement('option');
            option.value = lot.parking_lot_id;
            option.textContent = lot.lot_name || 'Unnamed Lot'; // Ensure the name is set
            parkingLotSelect.appendChild(option);
            console.log(`Added lot: ${option.textContent}`); // Log the lot name
        });
    } catch (error) {
        console.error('Error fetching parking lots:', error);
    }
}

// Function to show parking lot details
async function showParkingLot() {
    const selectedLotId = parkingLotSelect.value;
    if (selectedLotId) {
        try {
            const response = await fetch(`/api/parking-lots/${selectedLotId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch parking lot details');
            }
            const data = await response.json();
            const lotDetails = document.getElementById('parking-lot-details');
            lotDetails.innerHTML = `
                <h2>${data[0].lot_name}</h2>
                <p>Location: ${data[0].location}</p>
            `;
            fetchAvailableSpaces(selectedLotId);
        } catch (error) {
            console.error('Error fetching parking lot details:', error);
        }
    } else {
        // Clear details if no parking lot selected
        const lotDetails = document.getElementById('parking-lot-details');
        lotDetails.innerHTML = '';
        slotsContainer.innerHTML = '';
    }
}

// Fetch available spaces for selected parking lot
async function fetchAvailableSpaces(parkingLotId) {
    try {
        const response = await fetch(`/api/available-spaces/${parkingLotId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch available spaces');
        }
        const data = await response.json();
        slotsContainer.innerHTML = '';
        firstAvailableSpaceId = null; // Reset first available space ID
        data.forEach(space => {
            const listItem = document.createElement('li');
            listItem.textContent = `Space ID: ${space.space_id}, Status: ${space.is_occupied ? 'Occupied' : 'Available'}`;
            slotsContainer.appendChild(listItem);
            if (!space.is_occupied && firstAvailableSpaceId === null) {
                firstAvailableSpaceId = space.space_id; // Save the first available space ID
            }
        });
        console.log(`First available space ID: ${firstAvailableSpaceId}`); // Log the first available space ID
    } catch (error) {
        console.error('Error fetching available spaces:', error);
    }
}

// Event listener for selecting a parking lot
if (parkingLotSelect) {
    parkingLotSelect.addEventListener('change', showParkingLot);
}

// Event listener for view parking lot button
if (viewParkingLotButton) {
    viewParkingLotButton.addEventListener('click', () => {
        const selectedLotId = parkingLotSelect.value;
        if (selectedLotId) {
            window.location.href = `./parking-lot.html?lotId=${selectedLotId}`;
        } else {
            alert('Please select a parking lot first.');
        }
    });
}

// Fetch parking lots on page load if the parking lot select exists
fetchParkingLots();

// Event listener for vehicle entry form
if (entryForm) {
    entryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!currentUser) {
            alert('Please log in first.');
            return;
        }
        const formData = new FormData(entryForm);
        const data = Object.fromEntries(formData.entries());
        data.space_id = firstAvailableSpaceId; // Assign the first available space ID

        try {
            const response = await fetch('/api/vehicles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error('Failed to submit vehicle entry');
            }
            const result = await response.json();
            alert(result.message);
            entryForm.reset();
        } catch (error) {
            console.error('Error submitting vehicle entry:', error);
            alert('Failed to submit vehicle entry');
        }
        updateParkingSpace(firstAvailableSpaceId,1);

        
    

    });

}


const createLog = async (vehicle_id, space_id) => {
    const entry_time = new Date().toISOString(); // Set current date and time as entry time

    const data = {
        vehicle_id,
        space_id,
        entry_time,
        exit_time: null // Setting exit time as null initially
    };

    try {
        const response = await fetch('/api/logs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to create log entry');
        }

        const result = await response.json();
        console.log(result.message); // Optional: log success message or handle response
        return result; // Optionally return any response data
    } catch (error) {
        console.error('Error creating log entry:', error);
        throw new Error('Failed to create log entry');
    }
};




// Event listener for vehicle exit form (dummy function)
if (exitForm) {
    exitForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!currentUser) {
            alert('Please log in first.');
            return;
        }
        try {
            // Implement your vehicle exit logic here
            alert('Vehicle exit recorded'); // Dummy alert
            exitForm.reset();
        } catch (error) {
            console.error('Error updating log:', error);
        }
    });
}


async function updateParkingSpace(spaceId, isOccupied) {
    const data = {
        space_number: spaceId,
        is_occupied: isOccupied
    };

    try {
        const response = await fetch(`/api/parking-spaces/${spaceId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Failed to update parking space');
        }
        const result = await response.json();
        console.log(result.message);
    } catch (error) {
        console.error('Error updating parking space:', error);
        alert('Failed to update parking space');
    }
}


// Function to toggle the menu
window.toggleMenu = function() {
    const menuContent = document.querySelector('.menu-content');
    menuContent.classList.toggle('show');
};

// Function to handle logout
window.logout = function() {
    currentUser = null;
    window.location.href = 'index.html';
};

// Add event listener to close menu when clicking outside of it
document.addEventListener('click', function(event) {
    const menuContent = document.querySelector('.menu-content');
    const menuIcon = document.querySelector('.menu-icon');
    if (menuContent && menuIcon && !menuContent.contains(event.target) && !menuIcon.contains(event.target)) {
        menuContent.classList.remove('show');
    }
});

>>>>>>> Stashed changes
