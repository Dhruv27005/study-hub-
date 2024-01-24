

// import { getAuth} from 'https://cdn.skypack.dev/firebase/auth';
// import { getFirestore } from 'https://cdn.skypack.dev/firebase/firestore';
import { getAuth, signOut, initializeAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

const firebaseConfig = {
    apiKey: 'AIzaSyB2SrD9CDZwYwfIepRs-RKHJI_lxIkhyxU',
    authDomain: 'firbasebasics-656db.firebaseapp.com',
    projectId: 'firbasebasics-656db',
    storageBucket: 'firbasebasics-656db.appspot.com',
    messagingSenderId: '578521796858',
    appId: '1:578521796858:web:036b3b72da2c9f85e23943'
  };
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  // Add an event listener to the sign-out button
  const signOutButton = document.getElementById("signOutButton");
  
  if (signOutButton) {
    signOutButton.addEventListener("click", () => {
      // Sign out the current user
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          console.log("User signed out");
          alert("confirm signing out");
          // Redirect to the login or home page as needed
          const newUrl = window.location.origin + '/eduform/index.html'; // Adjust this URL accordingly
                window.history.replaceState({}, document.title, newUrl);
                // Redirect to the login page or any other page after sign out
                window.location.href = newUrl;
        })
        .catch((error) => {
          // An error happened.
          console.error("Sign-out error", error);
        });
    });
  }

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);


// // Function to sign out
// window.signOut = function () {
//   auth.signOut()
//     .then(() => {
//       console.log('User signed out');
//       // Replace the current history entry with the new one
//       const newUrl = window.location.origin + '/eduform/index.html'; // Adjust this URL accordingly
//       window.history.replaceState({}, document.title, newUrl);
//       // Redirect to the login page or any other page after sign out
//       window.location.href = newUrl;
//     })
//     .catch((error) => {
//       console.error('Sign-out error:', error);
//     });
// };

// // Add an event listener to your sign-out button
//  document.getElementById('signOutButton').addEventListener('click', window.signOut);


