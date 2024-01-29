// authHandler.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: 'AIzaSyB2SrD9CDZwYwfIepRs-RKHJI_lxIkhyxU',
    authDomain: 'firbasebasics-656db.firebaseapp.com',
    projectId: 'firbasebasics-656db',
    storageBucket: 'firbasebasics-656db.appspot.com',
    messagingSenderId: '578521796858',
    appId: '1:578521796858:web:036b3b72da2c9f85e23943'
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function checkAuthentication() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated
        resolve(user);
      } else {
        // User is not authenticated
        reject();
      }
    });
  });
}
