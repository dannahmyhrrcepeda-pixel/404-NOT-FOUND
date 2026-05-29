/**
 * MBSmart - Barangay Mantuyong AI Logic
 * Data Source: QUESTION.pdf
 */

const ragKnowledgeBase = [
    // 1. Leadership
    { keywords: ["captain", "capitan", "head", "leader", "areopagita"], response: "Based on information available as of early 2025, the Barangay Captain of Mantuyong, Mandaue City, is Julius Ceasar Lumapas Areopagita.He has been serving in this capacity, including overseeing the barangay during fire incidents in 2025. Note: Barangay officials are typically elected every few years, and this information reflects the leadership according to recent reports in 2025." },
    { keywords: ["official", "councilor", "sanchez", "pepito", "ramos", "heyrosa", "pono", "batistis"], response: "The Barangay Councilors include: Joseph Bryan Sanchez, Jose Pepito, Rizza Ramos, Jiovanni Heyrosa, D'Andrei Pono, and Randy Dennis Batistis." },
    { keywords: ["sk", "youth", "dela rama", "chairman"], response: "The Sangguniang Kabataan (SK) is led by Chairman Daisy Dela Rama, with councilors including John Vincent Frias, Carlos George Lopez, and others." },

    // 2. Local Information
    { keywords: ["what is", "history", "name", "mantu", "uyong"], response: "Mantuyong. The very small community of Mantuyong derived its name from a brilliant and active headsman called Mantu that was a very old title for a man who was “intelligent and progressive”. Mantu and the original families of the area lived in huts along a robust steam. It was a rich estuarine environment of mangroved swamps. Despite a native intelligence, Mantu dreamt of attending schools to gain more knowledge to benefit his flock. This was before Mandaue had any schools and his dream remained unfulfilled. Mantu’s altruism made him like a father to everyone young and old. As proof of this high regard and as a sign of respect, the people conferred on him a very old Cebuano honorific of “Uyong”. And as final tribute after his death the place became “Mantuyong” coined from “Mantu” and “Uyong”." },
    { keywords: ["location Barangay Mantuyong", "where", "address", "find","asa","Asa"], response: "We are located at A. Del Rosario St, Mantuyong, Mandaue City, Cebu (near the Mandaue City Cultural & Sports Complex)." },
    { keywords: ["time", "open", "schedule", "hours"], response: "The Barangay Hall is open Monday to Friday, 8:00 AM – 5:00 PM, and Saturday, 8:00 AM – 12:00 PM." },
    { keywords: ["contact", "number", "phone", "call", "hotline"], response: "You can reach the Barangay Hall at (032) 345-2090 or the official hotline at 0923-136-4807." },

    // 3. Services & Fees (2026 Rates)
    { keywords: ["clearance", "employment", "document"], response: "Barangay Clearance costs P50-P75. You need a Valid ID and a Cedula. It is FREE for first-time job seekers (RA 11261)." },
    { keywords: ["indigency", "certificate", "financial aid"], response: "Indigency Certificates are usually FREE (maximum admin fee is P20). It is often issued the same day within 20-45 minutes." },
    { keywords: ["fee", "how much", "cost", "price"], response: "2026 Official Rates: Clearance (P50-P75), Indigency (Usually FREE). Cedula costs an extra P5-P30 depending on income." },
    { keywords: ["requirement", "bring", "id", "need"], response: "Bring 1 Valid Gov ID (PhilSys/National ID is best) and a current Cedula. Note: Barangay Clearances are NOT accepted as an ID to get another clearance." },

    // 4. Voter Registration
    { keywords: ["voter", "register", "comelec", "vote"], response: "Registration is open until May 18, 2026 at COMELEC Mandaue (Mandaue City Cultural & Sports Complex)." },
    { keywords: ["check", "status", "precinct"], response: "You can check your status online via the COMELEC Voter Verifier website or visit the Mantuyong Hall to see the posted Master List." },

    // 5. Community Issues
    { keywords: ["population", "how many people", "residents"], response: "As of 2024, Mantuyong has an estimated 5,600-5,700 residents. About 2,500 of them are children." },
    { keywords: ["garbage", "trash", "waste", "dirty"], response: "Waste issues are caused by narrow streets that trucks cannot enter, high population density, and a lack of proper waste segregation by residents." },
    { keywords: ["safe", "crime", "murder", "rape", "theft", "kawat"], response: "Mantuyong is safe. Serious crimes like murder or rape are almost non-existent. Only petty theft (snatching/stolen bikes) occurs occasionally, mostly at night." },
    { keywords: ["purok", "block", "zone"], response: "There are 12 Puroks (Purok 1 to 12) in Mantuyong. There are no sitios." },
    { keywords: ["basketball", "volleyball", "sport", "court"], response: "There is a covered multi-purpose court near the Hall. Most puroks (3, 5, 8, 10) also have spaces for sports." },

    // 6. Humor & Interactions (As per PDF)
    { keywords: ["gwapa ko", "pretty", "beautiful"], response: "OF COURSE YOU ARE! You are truly beautiful, inside and out! You're definitely one of the most gwapa people in Barangay Mantuyong!" },
    { keywords: ["gwapo ko", "handsome"], response: "OF COURSE YOU ARE NOT! Being curious and responsible already makes you NOT charming! (Just kidding!)" },
    { keywords: ["kapoy", "tired"], response: "Don't be tired (kapoy) because if you are, your face might get even more 'batig nawng'!" },
    { keywords: ["kaon", "eat", "gutom"], response: "I have eaten already! Make sure you eat too—you shouldn't be hungry when you're this handsome/pretty!" } 
];

const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatWindow = document.getElementById('chat-window');

/**
 * Handles the sending and processing of messages
 */
function sendMessage() {
    const rawText = userInput.value.trim();
    const cleanText = rawText.toLowerCase();
    
    if (!rawText) return;

    // 1. Show User Message
    addMessage(rawText, 'user');
    userInput.value = "";

    // 2. Process Response
    // Default response if no keyword is found (as required by project intent)
    let botResponse = "I'm sorry, I am programmed only for Barangay Mantuyong inquiries. Please ask about clearances, officials, or schedules.";

    // Logic: Iterate through RAG base to find a match
    for (let entry of ragKnowledgeBase) {
        if (entry.keywords.some(k => cleanText.includes(k))) {
            botResponse = entry.response;
            break;
        }
    }

    // 3. Show Bot Response with a small "thinking" delay
    setTimeout(() => {
        addMessage(botResponse, 'bot');
    }, 600);
}

/**
 * Creates and appends message bubbles to the chat
 */
function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('msg', sender);
    msgDiv.innerText = text;
    chatWindow.appendChild(msgDiv);
    
    // Auto-scroll to the bottom
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Event Listeners
sendBtn.addEventListener('click', sendMessage);
