// --- NOTES DATA ---
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// --- DISPLAY NOTES ---
function displayNotes(filter = "") {
  const notesContainer = document.getElementById("notesContainer");
  notesContainer.innerHTML = '';

  notes.forEach((note, index) => {
    if (note.text.toLowerCase().includes(filter.toLowerCase())) {
      const noteEl = document.createElement('div');
      noteEl.className = 'note';
      noteEl.innerHTML = `
        <div contenteditable="false" class="note-text" id="note-${index}">${note.text}</div>
        <div class="note-actions">
          <button onclick="editNote(${index})">✏️</button>
          <button onclick="deleteNote(${index})">🗑️</button>
        </div>
      `;
      notesContainer.appendChild(noteEl);
    }
  });
}

// --- ADD NOTE ---
function addNote() {
  const text = document.getElementById("noteInput").value.trim();
  if (text) {
    notes.push({ text });
    localStorage.setItem("notes", JSON.stringify(notes));
    document.getElementById("noteInput").value = '';
    displayNotes();
  }
}

// --- DELETE NOTE ---
function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  displayNotes();
}

// --- EDIT NOTE ---
function editNote(index) {
  const noteDiv = document.getElementById(`note-${index}`);
  const isEditable = noteDiv.getAttribute("contenteditable") === "true";

  if (isEditable) {
    noteDiv.setAttribute("contenteditable", "false");
    notes[index].text = noteDiv.innerText.trim();
    localStorage.setItem("notes", JSON.stringify(notes));
  } else {
    noteDiv.setAttribute("contenteditable", "true");
    noteDiv.focus();
  }
}

// --- EVENT LISTENERS ---
document.getElementById("addNoteBtn").addEventListener("click", addNote);
document.getElementById("searchInput").addEventListener("input", (e) => {
  displayNotes(e.target.value);
});

// --- LOGIN SYSTEM ---
function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (savedUser && username === savedUser.username && password === savedUser.password) {
    localStorage.setItem("loggedIn", "true");
    showNotes();
  } else {
    alert("Invalid credentials.");
  }
}

function signup() {
  const username = prompt("Choose a username:");
  const password = prompt("Choose a password:");

  if (username && password) {
    localStorage.setItem("user", JSON.stringify({ username, password }));
    alert("Account created. You can now log in.");
  }
}

function logout() {
  localStorage.removeItem("loggedIn");
  window.location.reload();
}

function showNotes() {
  document.getElementById("loginSection").style.display = "none";
  document.getElementById("notesSection").style.display = "block";
  displayNotes();
}

// --- AUTO LOGIN CHECK ---
if (localStorage.getItem("loggedIn") === "true") {
  showNotes();
}
