// view.js

const firebaseConfig = {
    apiKey: 'AIzaSyB2SrD9CDZwYwfIepRs-RKHJI_lxIkhyxU',
    authDomain: 'firbasebasics-656db.firebaseapp.com',
    projectId: 'firbasebasics-656db',
    storageBucket: 'firbasebasics-656db.appspot.com',
    messagingSenderId: '578521796858',
    appId: '1:578521796858:web:036b3b72da2c9f85e23943'
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', () => {
    fetchBlogs();
});

async function fetchBlogs() {
    const blogsList = document.getElementById('blogs-list');
    blogsList.innerHTML = '';

    const querySnapshot = await db.collection('blogs').get();

    querySnapshot.forEach((doc) => {
        const blogData = doc.data();
        const blogId = doc.id;
        const blogDiv = createBlogDiv(blogId, blogData);
        blogsList.appendChild(blogDiv);
    });
}

function createBlogDiv(blogId, blogData) {
    const blogDiv = document.createElement('div');
    blogDiv.classList.add('blog');
    blogDiv.innerHTML = `
        <div class="blog-header">
          
            <h2>${blogData.title}</h2>
        </div>
        <div class="blog-content">
            ${blogData.fileUrl ? `<img src="${blogData.fileUrl}" alt="Blog Image">` : ''}
            <p>${blogData.content.replace(/\n/g, '<br>')}</p>
        </div>
        <div class="auther"><strong>${blogData.author}</strong></div>
    `;
    blogDiv.setAttribute('data-blog-id', blogId);
    return blogDiv;
}



