const firebaseConfig = {
    apiKey: 'AIzaSyB2SrD9CDZwYwfIepRs-RKHJI_lxIkhyxU',
    authDomain: 'firbasebasics-656db.firebaseapp.com',
    projectId: 'firbasebasics-656db',
    storageBucket: 'firbasebasics-656db.appspot.com',
    messagingSenderId: '578521796858',
    appId: '1:578521796858:web:036b3b72da2c9f85e23943'
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Get the saved username from localStorage
let username = localStorage.getItem('username');

document.addEventListener('DOMContentLoaded', () => {
    // If username is not saved, ask for it
    if (!username) {
        setUsername();
    } else {
        // If username is already saved, fetch questions
        fetchQuestions();
    }
});

async function setUsername() {
    // Ask for the username and save it in localStorage
    username = prompt("Enter your name:");
    localStorage.setItem('username', username);

    // Fetch questions after setting the username
    fetchQuestions();
}

async function fetchQuestions() {
    const questionsList = document.getElementById('questions-list');
    questionsList.innerHTML = '';

    const querySnapshot = await db.collection('questions').get();

    querySnapshot.forEach((doc) => {
        const questionData = doc.data();
        const questionId = doc.id;
        const questionDiv = createQuestionDiv(questionId, questionData);
        questionsList.appendChild(questionDiv);
    });
}
function createQuestionDiv(questionId, questionData) {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    questionDiv.innerHTML = `
      <strong>${questionData.username}</strong>
      <p>${questionData.question}</p>
      ${questionData.fileUrl ? `<a href="${questionData.fileUrl}" target="_blank">View File</a>` : ''}
      <div class="answers-summary" style="cursor: pointer; text-decoration: underline;">Show Answers (${questionData.answers.length})</div>
      <div class="answers" style="display: none;">
        ${questionData.answers.map(answer => `
          <div class="answer">
            <strong>${answer.username}</strong>: ${answer.answer}
            ${answer.fileUrl ? `<br><a href="${answer.fileUrl}" target="_blank">View File</a>` : ''}
          </div>
        `).join('')}
      </div>
      <textarea class="answer-input" placeholder="Your answer"></textarea>
      <input type="file" class="file-input" accept="image/*, .pdf, .doc, .docx">
      <button onclick="answer(this, '${questionId}')">Answer</button>
    `;
    questionDiv.setAttribute('data-question-id', questionId);
  
    const answersSummary = questionDiv.querySelector('.answers-summary');
    const answersBlock = questionDiv.querySelector('.answers');
  
    answersSummary.addEventListener('click', () => {
        answersBlock.style.display = (answersBlock.style.display === 'none') ? 'block' : 'none';
    });
  
    return questionDiv;
  }
  
// ... (Rest of the code remains the same)

// Function to ask a question
async function ask() {
    const questionText = document.getElementById('question').value;
    const fileInput = document.getElementById('file-input');

    if (username && questionText) {
        let fileUrl = null;

        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const storageRef = firebase.storage().ref('uploads/' + file.name);
            await storageRef.put(file);
            fileUrl = await storageRef.getDownloadURL();
        }

        // Check if the question already exists
        const existingQuestions = document.querySelectorAll('.question');
        const questionExists = Array.from(existingQuestions).some((question) => {
            const questionUsername = question.querySelector('strong').innerText;
            const questionTextContent = question.querySelector('p').innerText;
            return questionUsername === username && questionTextContent === questionText;
        });

        if (!questionExists) {
            const newQuestionRef = await db.collection('questions').add({
                username,
                question: questionText,
                answers: [],
                fileUrl,
            });

            const newQuestionDoc = await newQuestionRef.get();
            const newQuestionData = newQuestionDoc.data();
            const newQuestionId = newQuestionDoc.id;

            const questionDiv = createQuestionDiv(newQuestionId, newQuestionData);
            document.getElementById('questions-list').appendChild(questionDiv);

            // Clear input fields after asking
            document.getElementById('question').value = '';
            fileInput.value = ''; // Clear file input
             document.getElementById('username').value = '';
        } else {
            alert('This question already exists.');
        }
    }
}

// Function to answer a question
async function answer(button, questionId) {
    const answerInput = button.parentNode.querySelector('.answer-input');
    const answerText = answerInput ? answerInput.value.trim() : '';

    // Assuming you have a file input associated with each question
    const fileInput = button.parentNode.querySelector('.file-input');
    const file = fileInput ? fileInput.files[0] : null;

    if (answerText) {
        try {
            await addAnswerToFirestore(questionId, username, answerText, file);
            // Reset input fields after successfully adding the answer
            answerInput.value = '';
            fileInput.value = '';
        } catch (error) {
            console.error('Error adding answer to Firestore:', error);
        }
    }
}
async function addAnswerToFirestore(questionId, username, answerText, file) {
    const questionRef = db.collection('questions').doc(questionId);
    const answersArray = await questionRef.get().then(doc => doc.data().answers);
  
    const answer = {
        username,
        answer: answerText,
        fileUrl: null, // You can update this if you want to handle file attachments for answers
    };
  
    if (file) {
        // Handle file upload for answers here if needed
        answer.fileUrl = await uploadFile(file);
    }
  
    answersArray.push(answer);
  
    await questionRef.update({
        answers: answersArray,
    });
    fetchQuestions();
  }
  
  async function uploadFile(file) {
    if (file) {
        const storageRef = firebase.storage().ref('uploads/' + file.name);
        await storageRef.put(file);
        return await storageRef.getDownloadURL();
    }
    return null;
  }
  

