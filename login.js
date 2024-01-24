

// import { initializeApp } from 'https://cdn.skypack.dev/firebase/app';
// import { getAuth, signInWithEmailAndPassword } from 'https://cdn.skypack.dev/firebase/auth';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { getAuth,signInWithEmailAndPassword,initializeAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: 'AIzaSyB2SrD9CDZwYwfIepRs-RKHJI_lxIkhyxU',
    authDomain: 'firbasebasics-656db.firebaseapp.com',
    projectId: 'firbasebasics-656db',
    storageBucket: 'firbasebasics-656db.appspot.com',
    messagingSenderId: '578521796858',
    appId: '1:578521796858:web:036b3b72da2c9f85e23943'
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to log in
function logIn() {
    const email = document.getElementById('exampleInputEmail2').value;
    const password = document.getElementById('exampleInputPassword2').value;
  
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User logged in:', user);
        alert('You have successfully logged in!');
        // enableUploadButton();
        window.location.href = 'home.html'; // Redirect to the home page
      // window.close();
      })
      .catch((error) => {
        // Handle errors
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Login error:', errorCode, errorMessage);
      });
  }
  
  
  function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
  }
  
//   function enableUploadButton() {
//     document.getElementById('uploadFilesButton').removeAttribute('disabled');
// }
  
  window.logIn = logIn;
  window.togglePassword = togglePassword;
  


