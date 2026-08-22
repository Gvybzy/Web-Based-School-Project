/* Sign In / Sign Up — DEMO ONLY
   -------------------------------------------------------------
   This is a static front-end project with no server or database.
   There is no real account system: nothing here checks a real
   password, stores real user data, or protects anything. Any
   "successful" sign-in below just simulates what a logged-in
   view would look like, so please do not enter a real password
   you use elsewhere. Do not treat this as a secure login. */

function showSignIn() {
  document.getElementById('sign-in-form').style.display = 'block';
  document.getElementById('sign-up-form').style.display = 'none';
}

function showSignUp() {
  document.getElementById('sign-up-form').style.display = 'block';
  document.getElementById('sign-in-form').style.display = 'none';
}

function login(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  if (!email || !password) {
    alert('Please enter both an email and a password.');
    return false;
  }

  // Demo only: any well-formed input "succeeds" — nothing is verified
  // against a real account, because no backend exists yet.
  alert('Demo sign-in complete. This student portal is a front-end preview only — no account was checked or created.');
  window.location.href = '../index.html';
  return false;
}

function register(event) {
  event.preventDefault();
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;

  if (!name || !email || !password) {
    alert('Please fill in all fields.');
    return false;
  }

  alert('Demo sign-up complete. No account data was actually saved — this form has no backend yet.');
  showSignIn();
  return false;
}
