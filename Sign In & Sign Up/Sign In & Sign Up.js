// Show Sign In Form
function showSignIn() {
  document.getElementById("sign-in-form").style.display = "block";
  document.getElementById("sign-up-form").style.display = "none";
}

// Show Sign Up Form
function showSignUp() {
  document.getElementById("sign-up-form").style.display = "block";
  document.getElementById("sign-in-form").style.display = "none";
}

// Login Functionality with validation
function login(event) {
  event.preventDefault();
  
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  
  // Predefined credentials
  const correctEmail = "Sev@gmail.com";
  const correctPassword = "Sev1234";

  if (email === correctEmail && password === correctPassword) {
    window.location.href = "Home.html";
  } else {
    alert("Invalid credentials. Please try again.");
  }
}

// Register Functionality (for now, just show success)
function register(event) {
  event.preventDefault();
  alert("Sign Up Successful! You can now login.");
  showSignIn();
}
