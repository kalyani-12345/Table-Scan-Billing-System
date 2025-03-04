// Simulate order status updates
const statusItems = document.querySelectorAll('.status-item');
let currentStatus = 0;

function updateStatus() {
  if (currentStatus < statusItems.length) {
    statusItems[currentStatus].classList.add('active');
    currentStatus++;
  }
}

// Simulate status updates every 5 seconds (for demo purposes)
setInterval(updateStatus, 5000);

// Customer Support Button Functionality
document.getElementById('help-button').addEventListener('click', () => {
  alert('Your request for help has been sent to the admin!');
  // Send a request to the backend to notify admin
  fetch('/request-help', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: 'Customer needs help!' }),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Help request sent:', data);
  })
  .catch(error => {
    console.error('Error sending help request:', error);
  });
});