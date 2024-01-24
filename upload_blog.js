// upload.js

const firebaseConfig = {
   
    apiKey: "AIzaSyB2SrD9CDZwYwfIepRs-RKHJI_lxIkhyxU",
    authDomain: "firbasebasics-656db.firebaseapp.com",
    projectId: "firbasebasics-656db",
    storageBucket: "firbasebasics-656db.appspot.com",
    messagingSenderId: "578521796858",
    appId: "1:578521796858:web:62bab59b8bd5826ee23943"
  
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// document.addEventListener('DOMContentLoaded', () => {
//     // Logic specific to the upload page (if any)
// });

async function publishBlog() {
    const author = document.getElementById('author').value;
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const fileInput = document.getElementById('file-input');

    if (author && title && content) {
        let fileUrl = null;

        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const storageRef = firebase.storage().ref('blog-uploads/' + file.name);
            await storageRef.put(file);
            fileUrl = await storageRef.getDownloadURL();
        }

        const newBlogRef = await db.collection('blogs').add({
            author,
            title,
            content,
            fileUrl,
        });

        const newBlogDoc = await newBlogRef.get();
        const newBlogData = newBlogDoc.data();
        const newBlogId = newBlogDoc.id;

        // Additional logic specific to the upload page (if any)

        // Clear input fields after publishing
        document.getElementById('author').value = '';
        document.getElementById('title').value = '';
        document.getElementById('content').value = '';
        fileInput.value = ''; // Clear file input
    }
}
