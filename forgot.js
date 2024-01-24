import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, sendPasswordResetEmail , initializeAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";



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



function mySendPasswordResetEmail() {
    console.log("Inside sendPasswordResetEmail function");
    const resetEmail = document.getElementById('resetEmail').value;
    sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        alert('Password reset email sent. Check your inbox!');
        window.location.href = ("./sigup_logind.html");
      })
      .catch((error) => {
        console.error('Password reset error:', error.code, error.message);
      });
  }
  

  document.getElementById('resetPasswordButton').addEventListener('click', mySendPasswordResetEmail);
  
