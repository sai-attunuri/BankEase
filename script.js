document.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission for validation

  // Get form elements
  const firstName = document.getElementById('first-name').value.trim();
  const lastName = document.getElementById('last-name').value.trim();
  const gender = document.getElementById('gender').value;
  const dob = document.getElementById('dob').value;
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const pin = document.getElementById('pin').value;
  const reenterPin = document.getElementById('reenter-pin').value;

  // Validation flags
  let isValid = true;
  let errorMessage = '';

  // 1. First Name and Last Name should not be spaces
  if (firstName === '' || lastName === '') {
    errorMessage += 'First Name and Last Name should not be empty or spaces.\n';
    isValid = false;
  }

  // 2. Gender must be selected
  if (!gender) {
    errorMessage += 'Please select a gender.\n';
    isValid = false;
  }

  // 3. Date of birth should be selected and must be greater than year 1940
  if (!dob) {
    errorMessage += 'Date of Birth must be selected.\n';
    isValid = false;
  } else {
    const selectedDate = new Date(dob);
    const year1940 = new Date('1940-01-01');
    if (selectedDate <= year1940) {
      errorMessage += 'Date of Birth must be after the year 1940.\n';
      isValid = false;
    }
  }

  // 4. Phone number should not be empty and must be in the format +91{10 digits}
  const phonePattern = /^\+91\d{10}$/;
  if (!phone || !phonePattern.test(phone)) {
    errorMessage += 'Phone number must be in the format +91 followed by 10 digits.\n';
    isValid = false;
  }

  // 5. Email must not be empty and must end with @gmail.com
  const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!email || !emailPattern.test(email)) {
    errorMessage += 'Email must end with @gmail.com.\n';
    isValid = false;
  }

  // 6. PIN and Re-enter PIN must match and be 4 digits
  const pinPattern = /^\d{4}$/;
  if (!pinPattern.test(pin) || pin !== reenterPin) {
    errorMessage += 'PIN must be 4 digits and match the re-entered PIN.\n';
    isValid = false;
  }

  // Show error messages or submit the form
  if (!isValid) {
    alert(errorMessage);
  } else {
    alert('Form submitted successfully!');

    // Create FormData object
    const formData = new FormData(this);
    console.log('FormData:', Array.from(formData.entries())); // Log FormData

    // Prepare data for API
    const data = {
      firstName,
      lastName,
      gender,
      dob,
      phone,
      email,
      pin
    };

    // Make the API call
    fetch('https://oo62r8ome9.execute-api.us-east-1.amazonaws.com/Prod/createcustomer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
      console.log('Success:', result);
      alert('Customer created successfully!');
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to create customer. Please try again.');
    });
  }
});