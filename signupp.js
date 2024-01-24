function togglePassword(inputId) {
  const passwordInput = document.getElementById(inputId);
  const toggleButton = document.getElementById('togglePasswordButton');

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleButton.textContent = 'Hide Password';
  } else {
    passwordInput.type = 'password';
    toggleButton.textContent = 'Show Password';
  }
}


// import { initializeApp } from 'https://cdn.skypack.dev/firebase/app';
// import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'https://cdn.skypack.dev/firebase/auth';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,initializeAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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
const auth = getAuth(app)
// const firestore = getFirestore(app);

// Initializing Google Sign-In with my  client ID
// gapi.load('auth2', () => {
//   gapi.auth2.init({
//     client_id: '578521796858-a33kueruaul8o5tsc8hajomcqq625mh7.apps.googleusercontent.com',
//   });
// });


// Function to sign up
function signUp() {
  console.log("inside signup");
    const email = document.getElementById('exampleInputEmail1').value;
    const password = document.getElementById('exampleInputPassword1').value;
    const confirmPassword = document.getElementById('exampleInputConfirmPassword1').value;
  
    if (password !== confirmPassword) {
      console.error('Password and Confirm Password do not match');
      alert("Password and Confirm Password do not match");  
      return;
    }
  
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
       
        
        
        document.getElementById('signupForm').reset();
        // Redirect to the home page
        window.location.href = './home.html';
        // window.close();
        
      })
      .then(() => {
     console.log("user signed up",user);
        alert('You have successfully signed up!');
      })
      .catch((error) => {
        // Handle errors
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Sign-up error:', errorCode, errorMessage);
      });
  }
  
// Function to sign in with Google
window.signInWithGoogle = function () {
  console.log("inside sign in with google");
  const provider = new GoogleAuthProvider();
  // Force account selection
  provider.setCustomParameters({
    prompt: 'select_account',
  });

  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log('Google user signed in:', user);
      alert('You have successfully signed in!');
      window.open("home.html", "_self");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Google sign-in error:', errorCode, errorMessage);
    });
};
// Function to toggle password visibility


//   function enableUploadButton() {
//     const uploadButton = document.getElementById('uploadFilesButton');
//     if (uploadButton) {
//         uploadButton.removeAttribute('disabled');
//     }
// };

window.signUp = signUp;
window.signInWithGoogle = signInWithGoogle;
window.togglePassword = togglePassword;