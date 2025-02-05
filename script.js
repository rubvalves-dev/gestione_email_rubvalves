let emails = [];

// Initialize emails from URL parameters
function initializeFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const emailList = urlParams.get('emails');
  
  if (emailList) {
    try {
      // Try to parse as JSON array first
      const parsedEmails = JSON.parse(decodeURIComponent(emailList));
      if (Array.isArray(parsedEmails)) {
        emails = parsedEmails;
      }
    } catch (e) {
      // If JSON parsing fails, try comma-separated format
      emails = decodeURIComponent(emailList).split(',')
        .map(email => email.trim())
        .filter(email => validateEmail(email));
    }
    updateEmailList();
  }
}

function addEmail() {
  const emailInput = document.getElementById('emailInput');
  const email = emailInput.value.trim();
  
  if (validateEmail(email)) {
    emails.push(email);
    updateEmailList();
    emailInput.value = '';
  } else {
    alert('Per favore inserisci un indirizzo email valido');
  }
}

function removeEmail(index) {
  emails.splice(index, 1);
  updateEmailList();
}

function updateEmailList() {
  const emailList = document.getElementById('emailList');
  emailList.innerHTML = '';
  
  emails.forEach((email, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${email}
      <button class="remove-btn" onclick="removeEmail(${index})">Rimuovi</button>
    `;
    emailList.appendChild(li);
  });
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function printEmails() {
  const jsonData = JSON.stringify({ emails }, null, 2);
  Telegram.WebApp.sendData(jsonData);
  console.log(jsonData);
}

function toggleTheme() {
  const body = document.body;
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  body.setAttribute('data-theme', newTheme);
  
  // Update theme icon
  const themeIcon = document.getElementById('themeIcon');
  if (newTheme === 'dark') {
    themeIcon.innerHTML = `
      <svg fill="currentColor" viewBox="0 0 20 20">
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
      </svg>
    `;
  } else {
    themeIcon.innerHTML = `
      <svg fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"/>
      </svg>
    `;
  }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', initializeFromURL);