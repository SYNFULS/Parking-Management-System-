document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('auth-form');
    const authErrorMessage = document.getElementById('auth-error');
    const parkingLotSelect = document.getElementById('parking-lots');
    const slotsContainer = document.getElementById('slots-container');
    const entryForm = document.getElementById('entry-form');
    const exitForm = document.getElementById('exit-form');
    const amountDisplay = document.getElementById('amount-display');

    let currentUser = null;

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
            data.forEach(space => {
                const listItem = document.createElement('li');
                listItem.textContent = `Space ID: ${space.space_id}, Status: ${space.is_occupied}`;
                slotsContainer.appendChild(listItem);
            });
        } catch (error) {
            console.error('Error fetching available spaces:', error);
        }
    }

    // Event listener for selecting a parking lot
    if (parkingLotSelect) {
        parkingLotSelect.addEventListener('change', showParkingLot);
    }

    // Fetch parking lots on page load if the parking lot select exists
    if (parkingLotSelect) {
        fetchParkingLots();
    }

    // Event listener for vehicle entry form (dummy function)
    if (entryForm) {
        entryForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!currentUser) {
                alert('Please log in first.');
                return;
            }
            try {
                // Implement your vehicle entry logic here
                alert('Vehicle entry recorded'); // Dummy alert
                entryForm.reset();
            } catch (error) {
                console.error('Error adding vehicle:', error);
            }
        });
    }

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
});
