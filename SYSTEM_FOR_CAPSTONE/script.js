let currentUserType = 'resident';
let currentUser = {};
let myComplaintsList = []; // ✅ Store only posts made by current user

let officialsData = {
    brgy: [
        { position: 'Barangay Captain', name: 'Juan Dela Cruz', age: 52, sex: 'Male', photo: 'https://i.pravatar.cc/150?u=captain' },
        { position: 'Kagawad 1', name: 'Maria Santos', age: 45, sex: 'Female', photo: 'https://i.pravatar.cc/150?u=kagawad1' },
        { position: 'Kagawad 2', name: 'Jose Reyes', age: 48, sex: 'Male', photo: 'https://i.pravatar.cc/150?u=kagawad2' },
        { position: 'Kagawad 3', name: 'Ana Garcia', age: 42, sex: 'Female', photo: 'https://i.pravatar.cc/150?u=kagawad3' },
        { position: 'Kagawad 4', name: 'Rafael Lim', age: 50, sex: 'Male', photo: 'https://i.pravatar.cc/150?u=kagawad4' },
        { position: 'Kagawad 5', name: 'Liza Torres', age: 39, sex: 'Female', photo: 'https://i.pravatar.cc/150?u=kagawad5' },
        { position: 'SK Representative', name: 'Mark Villanueva', age: 23, sex: 'Male', photo: 'https://i.pravatar.cc/150?u=skrep' }
    ],
    sk: [
        { position: 'SK Chairperson', name: 'Mark Reyes', age: 22, sex: 'Male', photo: 'https://i.pravatar.cc/150?u=skchair' },
        { position: 'SK Kagawad 1', name: 'Sarah Cruz', age: 19, sex: 'Female', photo: 'https://i.pravatar.cc/150?u=sk1' },
        { position: 'SK Kagawad 2', name: 'Kevin Ong', age: 20, sex: 'Male', photo: 'https://i.pravatar.cc/150?u=sk2' },
        { position: 'SK Kagawad 3', name: 'Jenny Lee', age: 18, sex: 'Female', photo: 'https://i.pravatar.cc/150?u=sk3' },
        { position: 'SK Kagawad 4', name: 'Ronald Tan', age: 21, sex: 'Male', photo: 'https://i.pravatar.cc/150?u=sk4' },
        { position: 'SK Kagawad 5', name: 'Bea Santos', age: 17, sex: 'Female', photo: 'https://i.pravatar.cc/150?u=sk5' },
        { position: 'SK Kagawad 6', name: 'Leo Cruz', age: 22, sex: 'Male', photo: 'https://i.pravatar.cc/150?u=sk6' },
        { position: 'SK Kagawad 7', name: 'Mia Reyes', age: 19, sex: 'Female', photo: 'https://i.pravatar.cc/150?u=sk7' },
        { position: 'SK Secretary', name: 'Carlo Ruiz', age: 21, sex: 'Male', photo: 'https://i.pravatar.cc/150?u=sksec' }
    ]
};

// AUTH FUNCTIONS
function switchAuthSide(type) {
    currentUserType = type;
    const resBtn = document.getElementById('btnResidentSide');
    const admBtn = document.getElementById('btnAdminSide');
    
    if(resBtn && admBtn) {
        resBtn.classList.remove('bg-primary', 'text-white');
        resBtn.classList.add('text-gray-700');
        admBtn.classList.remove('bg-primary', 'text-white');
        admBtn.classList.add('text-gray-700');
    }
    
    if(type === 'resident') {
        if(resBtn) resBtn.classList.add('bg-primary', 'text-white');
        document.getElementById('userTypeLabel').textContent = 'RESIDENT PORTAL';
    } else {
        if(admBtn) admBtn.classList.add('bg-primary', 'text-white');
        document.getElementById('userTypeLabel').textContent = 'ADMIN PORTAL';
    }
}

function swipeAuthRight() {
    document.getElementById('authSwipeWrapper').style.transform = 'translateX(-100%)';
}

function swipeAuthLeft() {
    document.getElementById('authSwipeWrapper').style.transform = 'translateX(0)';
}

function saveRegistration() {
    currentUser = {
        fname: document.getElementById('regFname').value,
        mname: document.getElementById('regMname').value,
        lname: document.getElementById('regLname').value,
        dob: document.getElementById('regDob').value,
        sex: document.getElementById('regSex').value,
        contact: document.getElementById('regContact').value,
        purok: document.getElementById('regPurok').value
    };
    alert('Registration successful! You can now login.');
    swipeAuthLeft();
}

function enterSystem() {
    document.getElementById('authSection').classList.add('hidden');
    document.getElementById('dashboardPage').classList.remove('hidden');
    
    if(currentUserType === 'admin') {
        document.querySelectorAll('.admin-only').forEach(el => el.classList.remove('hidden'));
    }
    
    updateTimeAgo();
    setInterval(updateTimeAgo, 1000);
}

// NAVIGATION
function goBack(pageId) {
    document.querySelectorAll('section').forEach(el => el.classList.add('hidden'));
    document.getElementById(pageId).classList.remove('hidden');
}

function toggleMainMenu() {
    document.getElementById('mainMenuDropdown').classList.toggle('hidden');
}

// ✅ FULL OPEN PROFILE FUNCTION
function openProfile() {
    document.getElementById('profileName').textContent = `${currentUser.fname} ${currentUser.lname}`;
    document.getElementById('profileAge').textContent = '30';
    document.getElementById('profileSex').textContent = currentUser.sex;
    document.getElementById('profilePurok').textContent = currentUser.purok;
    document.getElementById('profileContact').textContent = currentUser.contact;

    // ✅ SHOW ONLY POSTS MADE BY THIS USER
    const myComplaintsDiv = document.getElementById('myComplaints');
    myComplaintsDiv.innerHTML = '';
    if(myComplaintsList.length === 0) {
        myComplaintsDiv.innerHTML = '<p class="text-sm text-gray-500">You have not posted any complaints yet.</p>';
    } else {
        myComplaintsList.forEach(post => {
            const item = document.createElement('div');
            item.className = 'p-2 bg-white rounded mb-2 border';
            item.innerHTML = `
                <p class="font-bold text-sm">${post.title}</p>
                <p class="text-xs text-gray-600">${post.desc}</p>
            `;
            myComplaintsDiv.appendChild(item);
        });
    }

    goBack('profilePage');
}

function openProfileView(name, age, sex, purok, contact) {
    document.getElementById('profileName').textContent = name;
    document.getElementById('profileAge').textContent = age;
    document.getElementById('profileSex').textContent = sex;
    document.getElementById('profilePurok').textContent = purok;
    document.getElementById('profileContact').textContent = contact || 'Private';
    goBack('profilePage');
}

function openGrievance() { goBack('grievancePage'); }
function openBulletin() { goBack('bulletinPage'); }
function openAppointment() { goBack('appointmentPage'); }
function openAbout() { goBack('aboutPage'); toggleMainMenu(); }
function openContact() { goBack('contactPage'); toggleMainMenu(); }
function openSettings() { goBack('settingsPage'); toggleMainMenu(); }
function logout() { location.reload(); }

// OFFICIALS
function goToOfficialsPage() {
    goBack('officialsPage');
    showOfficialList('brgy');
}

function showOfficialList(type) {
    document.getElementById('btnBrgyOff').classList.remove('bg-primary', 'text-white');
    document.getElementById('btnBrgyOff').classList.add('bg-gray-200', 'text-gray-700');
    document.getElementById('btnSkOff').classList.remove('bg-primary', 'text-white');
    document.getElementById('btnSkOff').classList.add('bg-gray-200', 'text-gray-700');
    
    if(type === 'brgy') {
        document.getElementById('btnBrgyOff').classList.add('bg-primary', 'text-white');
    } else {
        document.getElementById('btnSkOff').classList.add('bg-primary', 'text-white');
    }

    const content = document.getElementById('officialsContent');
    content.innerHTML = '';
    
    officialsData[type].forEach((off) => {
        const item = document.createElement('div');
        item.className = 'flex items-center gap-4 p-3 bg-gray-50 rounded-lg';
        item.innerHTML = `
            <img src="${off.photo}" class="w-12 h-12 rounded-full object-cover">
            <div class="flex-1">
                <p class="font-bold text-primary">${off.position}</p>
                <p>${off.name}, ${off.age} yrs old • ${off.sex}</p>
            </div>
        `;
        content.appendChild(item);
    });
}

function editOfficial(type, index) {
    const off = officialsData[type][index];
    document.getElementById('editPos').value = off.position;
    document.getElementById('editName').value = off.name;
    document.getElementById('editAge').value = off.age;
    document.getElementById('editSex').value = off.sex;
    document.getElementById('editPhoto').value = off.photo;
    
    window.currentEdit = { type, index };
    document.getElementById('editOfficialModal').classList.remove('hidden');
}

function saveEditOfficial() {
    const { type, index } = window.currentEdit;
    officialsData[type][index].position = document.getElementById('editPos').value;
    officialsData[type][index].name = document.getElementById('editName').value;
    officialsData[type][index].age = document.getElementById('editAge').value;
    officialsData[type][index].sex = document.getElementById('editSex').value;
    officialsData[type][index].photo = document.getElementById('editPhoto').value;
    
    closeModal('editOfficialModal');
    showOfficialList(type);
    alert('Official details updated successfully!');
}

// ✅ GRIEVANCE: RESIDENTS CAN POST, ALL CAN COMMENT UNLIMITED
function openNewComplaintModal() {
    document.getElementById('newComplaintModal').classList.remove('hidden');
}

function submitComplaint() {
    const title = document.getElementById('compTitle').value;
    const desc = document.getElementById('compDesc').value;
    const contact = document.getElementById('compContact').value;
    const img = document.getElementById('compImg').value || 'https://picsum.photos/id/237/600/200';

    // Save to personal list
    myComplaintsList.push({ title, desc, contact, img });

    // Add to public list
    const container = document.getElementById('complaintsContainer');
    const newPost = document.createElement('div');
    newPost.className = 'bg-white rounded-xl shadow-md p-4 mb-4 border';
    newPost.innerHTML = `
        <div class="flex justify-between items-start mb-2">
            <div>
                <span class="font-bold text-gray-800">${currentUser.fname} ${currentUser.lname}</span>
                <p class="text-xs text-gray-500">Purok ${currentUser.purok} • Posted <span class="time-ago" data-timestamp="${new Date().toISOString()}">Just now</span></p>
            </div>
            <span class="status-badge px-3 py-1 rounded-full text-xs font-bold status-notseen bg-notseen/10 text-notseen">NOT YET SEEN</span>
        </div>
        <p class="text-gray-700 my-3">${desc}</p>
        <img src="${img}" class="w-full h-32 object-cover rounded-lg my-3">
        <div class="flex justify-between items-center">
            <button onclick="toggleComments(this)" class="text-sm text-primary font-medium hover:underline">
                <i class="fa fa-comment-o mr-1"></i> View Comments
            </button>
            <div class="admin-only hidden">
                <select onchange="changeStatus(this, this.parentElement.parentElement.parentElement.querySelector('.status-badge'))" class="text-xs border rounded px-2 py-1">
                    <option value="notseen" selected>Mark: NOT YET SEEN</option>
                    <option value="pending">Mark: PENDING</option>
                    <option value="done">Mark: DONE</option>
                </select>
            </div>
        </div>
        <div class="comments-section hidden mt-3 pt-3 border-t border-gray-100">
            <div class="comments-list space-y-2 mb-3"></div>
            <div class="flex gap-2">
                <input type="text" placeholder="Add a public comment..." class="new-comment-input flex-1 text-sm border rounded px-3 py-2">
                <button onclick="addComment(this)" class="bg-primary text-white px-3 py-1 rounded">Submit</button>
            </div>
        </div>
    `;
    container.prepend(newPost);

    closeModal('newComplaintModal');
    alert('Complaint posted successfully!');
}

function changeStatus(selectEl, badgeEl) {
    const status = selectEl.value;
    badgeEl.classList.remove('status-notseen', 'status-pending', 'status-done');
    if(status === 'notseen') {
        badgeEl.className = 'status-badge px-3 py-1 rounded-full text-xs font-bold status-notseen bg-notseen/10 text-notseen';
        badgeEl.textContent = 'NOT YET SEEN';
    } else if(status === 'pending') {
        badgeEl.className = 'status-badge px-3 py-1 rounded-full text-xs font-bold status-pending bg-pending/10 text-pending';
        badgeEl.textContent = 'PENDING';
    } else if(status === 'done') {
        badgeEl.className = 'status-badge px-3 py-1 rounded-full text-xs font-bold status-done bg-done/10 text-done';
        badgeEl.textContent = 'DONE';
    }
}

function toggleComments(btnEl) {
    const section = btnEl.parentElement.parentElement.querySelector('.comments-section');
    section.classList.toggle('show');
    btnEl.innerHTML = section.classList.contains('show') 
        ? `<i class="fa fa-comment-o mr-1"></i> Hide Comments` 
        : `<i class="fa fa-comment-o mr-1"></i> View Comments`;
}

// ✅ UNLIMITED COMMENTS FUNCTION
function addComment(btnEl) {
    const input = btnEl.parentElement.querySelector('.new-comment-input');
    const text = input.value.trim();
    if(!text) return;

    const list = btnEl.parentElement.parentElement.querySelector('.comments-list');
    const comment = document.createElement('div');
    comment.className = 'bg-gray-50 p-2 rounded-lg';
    comment.innerHTML = `
        <p class="text-xs font-semibold">${currentUser.fname} ${currentUser.lname}:</p>
        <p class="text-sm">${text}</p>
    `;
    list.appendChild(comment);
    input.value = '';
}

// BULLETIN ✅ ONLY ADMIN CAN POST
function openNewBulletinModal() {
    if(currentUserType !== 'admin') {
        alert('Only Barangay Officials can post announcements.');
        return;
    }
    document.getElementById('newBulletinModal').classList.remove('hidden');
}

// MODAL CLOSE
function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

// TIME AGO
function updateTimeAgo() {
    document.querySelectorAll('.time-ago').forEach(el => {
        const timestamp = new Date(el.getAttribute('data-timestamp'));
        const now = new Date();
        const diffMs = now - timestamp;
        
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
        
        el.textContent = `${hours} hours ${minutes} minutes ${seconds} seconds ago`;
    });
}

// AI CHAT
const aiResponses = {
    "what documents do i need for barangay clearance?": "You need 1 valid government ID, 1x1 ID photo, and proof of residency.",
    "how to get certificate of indigency?": "Bring a request letter, ID, and visit the barangay office for assessment.",
    "what time is office open?": "Monday to Friday, 8:00 AM - 5:00 PM, closed weekends & holidays.",
    "where is barangay mantuyong located?": "Eastern part of Mandaue City, near Cebu City boundary, Cebu.",
    "how to file complaint?": "Go to Grievance section → Click +NEW COMPLAINT → Fill form & submit.",
    "how to book appointment?": "Go to Appointment section → Fill form → Submit & wait confirmation.",
    "who is the barangay captain?": "Hon. Juan Dela Cruz is the current Barangay Captain.",
    "how many puroks are there?": "There are 14 puroks/zones in Barangay Mantuyong.",
    "is there free medical assistance?": "Yes, we have free medical check-ups every first Saturday of the month.",
    "how to contact barangay office?": "Call +63 (032) 230 4500 or visit our Facebook page.",
    "what is the postal code of barangay mantuyong?": "Postal code is 6014.",
    "what do the complaint status colors mean?": "Red=Not Yet Seen, Yellow=Pending, Green=Resolved/Done."
};

function openChatAI() {
    goBack('chatAIPage');
}

function insertQuestion(text) {
    document.getElementById('aiInput').value = text;
}

function sendAIMessage() {
    const input = document.getElementById('aiInput');
    const message = input.value.trim();
    if(!message) return;

    const chat = document.getElementById('chatMessages');
    const userMsg = document.createElement('div');
    userMsg.className = 'flex gap-3 justify-end';
    userMsg.innerHTML = `
        <div class="bg-primary text-white p-3 rounded-lg rounded-tr-none max-w-[80%] text-sm">${message}</div>
        <div class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs mt-1">YOU</div>
    `;
    chat.appendChild(userMsg);

    const key = message.toLowerCase();
    let reply = "Sorry, I don't have information about that. Please ask the barangay office directly.";
    for(const q in aiResponses) {
        if(key.includes(q)) {
            reply = aiResponses[q];
            break;
        }
    }

    setTimeout(() => {
        const aiMsg = document.createElement('div');
        aiMsg.className = 'flex gap-3';
        aiMsg.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center text-xs mt-1">AI</div>
            <div class="bg-blue-50 p-3 rounded-lg rounded-tl-none max-w-[80%] border-l-4 border-secondary text-sm">${reply}</div>
        `;
        chat.appendChild(aiMsg);
        chat.scrollTop = chat.scrollHeight;
    }, 600);

    input.value = '';
    chat.scrollTop = chat.scrollHeight;
}