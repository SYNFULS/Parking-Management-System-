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
